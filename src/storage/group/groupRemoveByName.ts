import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupRemoveByName(groupName:string) {
  try {
    const storedGroups = await groupsGetAll();
    console.log(storedGroups);
    const groups = storedGroups.filter(group => group !== groupName);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)

  } catch (error) {
    throw error;
  }
}