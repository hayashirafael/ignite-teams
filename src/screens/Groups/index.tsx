import { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Container } from './styles';

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);
  const navigation = useNavigation()

  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    console.log('use effect executous');
    fetchGroups();
  }, []));


  return (
    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='jogue com sua turma'
      />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message='Cadastre uma turma' />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
      />
      <Button
        title='Criar nova turma'
        onPress={handleNewGroup}
      />

    </Container>
  );
}
