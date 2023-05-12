import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import {
  LocationObject,
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

// Appwrite functions
import { sendLocationPing } from '@nx-expo/appwrite';

export const TrackerPrompt = () => {
  const [location, setLocation] = useState<LocationObject>();

  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await getCurrentPositionAsync();

      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    if (location) sendLocationPing(location);
  }, [location]);

  return <Text>You are being tracked...</Text>;
};
