import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getData = async (key: string) => {
  try {
    const storedValue = await AsyncStorage.getItem(key);
    if (storedValue !== null) {
      return storedValue;
    }
  } catch (e) {
    // error reading value
  }
};

const ROUTE_ID_KEY = 'route_id';

export const storeRouteId = async (routeId: string) => {
  return await storeData(ROUTE_ID_KEY, routeId);
};

export const getRouteId = async () => {
  return await getData(ROUTE_ID_KEY);
};
