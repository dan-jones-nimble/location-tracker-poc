import { Databases, ID } from 'appwrite';
import { LocationObject } from 'expo-location';
import { getAccount } from '../../auth';
import { client } from '../../client';

export const sendLocationPing = async (location: LocationObject) => {
  const databases = new Databases(client);
  const account = await getAccount();
  databases
    .createDocument(
      '645cb634dee5541fe541',
      '645cb63abc197066cd6e',
      ID.unique(),
      {
        user_id: account['$id'],
        route_id: '1',
        altitude: location.coords.altitude,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp,
      }
    )
    .then((response) => {
      console.log('ping ping: ', response);
    })
    .catch((error) => {
      console.log('Error pinging: ', error);
    });
};
