// Imports
import { Button, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

// Components
import { Separator } from '@nx-expo/components';

// Context
import { useLocationTracking } from '@nx-expo/context';

// Utils
import { newRouteId } from '../utils';

export const TrackerPrompt = () => {
  const { currentlyTracking, locationTrackingError } = useLocationTracking();
  const locationText = 'You must accept tracking';
  const [text, setText] = useState<string>(locationText);

  useEffect(() => {
    if (currentlyTracking) {
      setText('You are being tracked...');
    }
    if (locationTrackingError) {
      setText(`You aren't being tracked...\n${locationTrackingError.display}`);
    }
  }, [locationTrackingError, currentlyTracking]);

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
