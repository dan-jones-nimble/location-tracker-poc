import { Functions } from 'appwrite';
import { client } from '../../client';

export interface MinimalLocationObject {
  altitude: number;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export const getLocationPings = async (
  routeId: string
): Promise<Array<MinimalLocationObject>> => {
  const functions = new Functions(client);

  const payloadData = JSON.stringify({
    routeId
  });

  return functions
    .createExecution('6475f25bcf7393058931', payloadData)
    .then((execution) => {
      const response: {
        code: number;
        message: Array<MinimalLocationObject>;
      } = JSON.parse(execution.response);
      console.log('Success: ', response);
      return response.message;
    })
    .catch((error) => {
      console.error('Error getting location: ', error);
      return [];
    });
};
