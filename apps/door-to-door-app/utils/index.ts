import { randomUUID } from 'expo-crypto';
import { storeRouteId } from '@nx-expo/storage';

export const newRouteId = () => {
  const newId = randomUUID().toLocaleLowerCase();
  return storeRouteId(newId);
};
