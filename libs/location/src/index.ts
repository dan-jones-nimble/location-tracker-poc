import {
  LocationAccuracy,
  LocationObject,
  requestBackgroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  startLocationUpdatesAsync,
} from 'expo-location';
import { defineTask } from 'expo-task-manager';
import { sendLocationPing } from '@nx-expo/appwrite';

const LOCATION_TASK_NAME = 'background-location-task';

export const requestPermissions = async () => {
  const { status: foregroundStatus } =
    await requestForegroundPermissionsAsync();

  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } =
      await requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: LocationAccuracy.High,
        distanceInterval: 5,
      });
    }
  }
};

defineTask<Array<LocationObject>>(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log(locations);
    sendLocationPing(locations[0]);
  }
});
