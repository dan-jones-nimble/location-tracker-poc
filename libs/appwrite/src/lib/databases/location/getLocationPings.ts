import { Functions } from 'appwrite';
import { client } from '../../client';
import { LocationObject } from 'expo-location';

export const getLocationPings = async (
  routeId: string
): Promise<Array<LocationObject>> => {
  const functions = new Functions(client);

  const payloadData = JSON.stringify({
    routeId
  });

  return functions
    .createExecution('6475f25bcf7393058931', payloadData)
    .then((execution) => {
      const response: {
        code: number;
        message: Array<LocationObject>;
      } = JSON.parse(execution.response);
      console.log('Success: ', response);
      return response.message;
    })
    .catch((error) => {
      console.error('Error pinging: ', error);
      return [];
    });
};
