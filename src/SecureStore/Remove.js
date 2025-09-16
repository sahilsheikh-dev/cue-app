import * as SecureStore from "expo-secure-store";
export default async function remove(key) {
  await SecureStore.deleteItemAsync(key);
}
