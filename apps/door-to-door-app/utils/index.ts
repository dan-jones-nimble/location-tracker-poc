import { randomUUID } from 'expo-crypto';
import { ID } from 'appwrite';
import { storeRouteId } from '@nx-expo/storage';

export const newRouteId = () => {
  const newId = ID.custom(randomUUID().toLocaleLowerCase());
  return storeRouteId(newId);
};
