import {
  LocationAccuracy,
  requestBackgroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  startLocationUpdatesAsync
} from 'expo-location';
import { defineTask } from 'expo-task-manager';

import { sendLocationPing } from '@nx-expo/appwrite';

const LOCATION_TASK_NAME = 'background-location-task';

export const requestPermissions = async () => {
  const { status: foregroundStatus } =
    await requestForegroundPermissionsAsync();

  if (foregroundStatus !== 'granted') {
    throw new Error('You must enable foreground location services.');
  }

  const { status: backgroundStatus } =
    await requestBackgroundPermissionsAsync();

  if (backgroundStatus !== 'granted') {
    throw new Error('You must enable background location services.');
  }

  await startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: LocationAccuracy.High,
    distanceInterval: 5
  });
};

defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    console.log(locations);
    locations.forEach(sendLocationPing);
  }
});
