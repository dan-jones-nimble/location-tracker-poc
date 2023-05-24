import { Functions } from 'appwrite';
import { LocationObject } from 'expo-location';
import { getRouteId } from '@nx-expo/storage';
import { client } from '../../client';

export const sendLocationPing = async (location: LocationObject) => {
  const functions = new Functions(client);
  const currentRouteId = await getRouteId();

  const payloadData = JSON.stringify({
    routeId: currentRouteId,
    location
  });
  console.log(payloadData);

  functions
    .createExecution('646b5f178fa8d045a8cf', payloadData)
    .then((response) => console.log('Success: ', response))
    .catch((error) => console.error('Error pinging: ', error));
};
