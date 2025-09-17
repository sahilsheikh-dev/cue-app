import { safeGet } from "./safeSecureStore";
export default safeGet;

// import * as SecureStore from "expo-secure-store";
// export default async function get(key) {
//   let result = await SecureStore.getItemAsync(key);
//   if (result) {
//     return result;
//   } else {
//     return false;
//   }
// }

// import { getItem } from './safeSecureStore';
// export default async function get(key) {
//   return await getItem(key);
// }
