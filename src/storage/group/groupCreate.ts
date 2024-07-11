import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroup: string) {
  try {
    const newGroupValidated = newGroup.trim();
    const storedGroups = await groupsGetAll();

    const groupAlreadyExists = storedGroups.includes(newGroupValidated);

    const groupEmptyName = newGroupValidated.length === 0;

    if (groupAlreadyExists) {
      throw new AppError('Já existe um grupo cadastrado com esse nome.');
    } else if (groupEmptyName) {
      throw new AppError('Informe o nome do grupo.');
    }

    const storage = JSON.stringify([...storedGroups, newGroup]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}