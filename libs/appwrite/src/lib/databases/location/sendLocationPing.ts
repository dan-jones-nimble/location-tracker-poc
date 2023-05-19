import { Databases, ID } from 'appwrite';
import { LocationObject } from 'expo-location';
import { getRouteId } from '@nx-expo/storage';
import { getAccount } from '../../auth';
import { client } from '../../client';

export const sendLocationPing = async (location: LocationObject) => {
  const databases = new Databases(client);
  const account = await getAccount();
  const currentRouteId = await getRouteId();
  databases
    .createDocument(
      '645cb634dee5541fe541',
      '645cb63abc197066cd6e',
      ID.unique(),
      {
        user_id: account['$id'],
        route_id: currentRouteId,
        altitude: location.coords.altitude,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp
      }
    )
    .catch((error) => {
      console.error('Error pinging: ', error);
    });
};
