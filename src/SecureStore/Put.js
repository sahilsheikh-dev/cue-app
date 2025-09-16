import * as SecureStore from "expo-secure-store";
export default async function put(key, value) {
  await SecureStore.setItemAsync(key, value);
}
