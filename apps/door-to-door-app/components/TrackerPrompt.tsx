// Imports
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {
  requestPermissions,
  startLocationTracking,
  stopLocationTracking
} from '@nx-expo/location';
import { Separator } from '@nx-expo/components';

// Utils
import { newRouteId } from '../utils';

export const TrackerPrompt = () => {
  const [locationTrackingPermitted, setLocationTrackingPermitted] =
    useState<boolean>(false);
  const [currentlyTracking, setCurrentlyTracking] = useState<boolean>(false);
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
        .then(() => {
          setText('You are being tracked...');
          setCurrentlyTracking(true);
        })
        .catch(handleError);
    }

    return () => {
      stopLocationTracking().then(() => {
        setText("You aren't being tracked...");
        setCurrentlyTracking(false);
      });
    };
  }, [locationTrackingPermitted]);

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      {currentlyTracking && (
        <View style={styles.subContainer}>
          <Separator />
          <Button title="New Route" onPress={newRouteId} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
});
