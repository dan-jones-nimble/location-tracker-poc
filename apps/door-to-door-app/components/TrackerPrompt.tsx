// Imports
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import {
  requestPermissions,
  startLocationTracking,
  stopLocationTracking
} from '@nx-expo/location';

export const TrackerPrompt = () => {
  const [locationTrackingPermitted, setLocationTrackingPermitted] =
    useState<boolean>(false);
  const [text, setText] = useState<string>('You must accept tracking');

  const handleError = (error) =>
    setText(`You aren't being tracked...\n${error.message}`);

  useEffect(() => {
    requestPermissions()
      .then(() => setLocationTrackingPermitted(true))
      .catch(handleError);
  }, []);

  useEffect(() => {
    if (locationTrackingPermitted) {
      startLocationTracking()
        .then(() => setText('You are being tracked...'))
        .catch(handleError);
    }

    return () => {
      stopLocationTracking().then(() => setText("You aren't being tracked..."));
    };
  }, [locationTrackingPermitted]);

  return <Text>{text}</Text>;
};
