import { AsyncStorage } from "react-native";

export const getFromLocalStorage = async (key, func) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      await func(value);
    }
  } catch (e) {
    console.log(e, 'Not found');
  }
}

export const storeDataLocalStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}

export const removeDataLocalStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch(exception) {
    return false;
  }
}