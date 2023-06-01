import { Platform } from 'react-native';
import {
  LocationAccuracy,
  requestBackgroundPermissionsAsync,
  requestForegroundPermissionsAsync,
  startLocationUpdatesAsync,
  stopLocationUpdatesAsync
} from 'expo-location';
import { defineTask } from 'expo-task-manager';
import { sendLocationPing } from '@nx-expo/appwrite';

const BACKGROUND_LOCATION_TRACKING_TASK_NAME = 'background-location-task';

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
};

export const startLocationTracking = async () => {
  if (Platform.OS !== 'web') {
    await startLocationUpdatesAsync(BACKGROUND_LOCATION_TRACKING_TASK_NAME, {
      accuracy: LocationAccuracy.High,
      distanceInterval: 5,
      deferredUpdatesDistance: 5
    });
  } else {
    throw new Error('Location tracking not available on Web.');
  }
};

export const stopLocationTracking = async () => {
  if (Platform.OS !== 'web') {
    await stopLocationUpdatesAsync(BACKGROUND_LOCATION_TRACKING_TASK_NAME);
  }
};

defineTask(BACKGROUND_LOCATION_TRACKING_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log(error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    locations.forEach(sendLocationPing);
  }
});
