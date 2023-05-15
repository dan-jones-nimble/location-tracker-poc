// Imports
import { useEffect } from 'react';
import { Text } from 'react-native';
import { requestPermissions } from '@nx-expo/location';

export const TrackerPrompt = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  return <Text>You are being tracked...</Text>;
};
