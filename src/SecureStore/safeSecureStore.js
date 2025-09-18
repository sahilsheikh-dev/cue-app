import * as SecureStore from "expo-secure-store";

const isAvailable = SecureStore && typeof SecureStore.setItemAsync === "function";

// simple in-memory fallback
const memoryStore = {};

export async function safePut(key, value) {
  if (isAvailable) {
    try {
      await SecureStore.setItemAsync(key, value);
      return true;
    } catch (err) {
      console.warn("SecureStore put error:", err);
      memoryStore[key] = value;
      return false;
    }
  } else {
    memoryStore[key] = value;
    return false;
  }
}

export async function safeGet(key) {
  if (isAvailable) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      console.warn("SecureStore get error:", err);
      return memoryStore[key] || null;
    }
  } else {
    return memoryStore[key] || null;
  }
}

export async function safeRemove(key) {
  if (isAvailable) {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch (err) {
      console.warn("SecureStore remove error:", err);
      delete memoryStore[key];
      return false;
    }
  } else {
    delete memoryStore[key];
    return false;
  }
}
