import * as SecureStore from "expo-secure-store";
export default async function get(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return false;
  }
}
