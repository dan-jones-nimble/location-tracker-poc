// Imports
import { Button, StyleSheet, Text, View } from 'react-native';

// Components
import { Separator } from '@nx-expo/components';

// Context
import { useLocationTracking } from '@nx-expo/context';

// Utils
import { newRouteId } from '../utils';

export const TrackerPrompt = () => {
  // TODO: wth
  const { currentlyTracking, locationTrackingError } = useLocationTracking();

  return (
    <View style={styles.container}>
      <Text>{`You aren't being tracked...\\n${locationTrackingError.display}`}</Text>
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
