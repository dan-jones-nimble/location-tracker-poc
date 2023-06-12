import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { getLocationPings, MinimalLocationObject } from '@nx-expo/appwrite';
import { openURL } from 'expo-linking';

const buildWaypointsUrl = (waypoints: Array<MinimalLocationObject>) => {
  const firstWaypoint = waypoints.shift();
  const lastWaypoint = waypoints.pop();
  const remainingWaypoints = waypoints.map(
    (locationObject: MinimalLocationObject) => ({
      latitude: locationObject.latitude,
      longitude: locationObject.longitude
    })
  );

  const originParam = `origin=${firstWaypoint.latitude},${firstWaypoint.longitude}`;
  const destinationParam = `destination=${lastWaypoint.latitude},${lastWaypoint.longitude}`;
  const waypointsParam = `waypoints=${remainingWaypoints
    .map((waypoint) => `${waypoint.latitude},${waypoint.longitude}`)
    .join('|')}`;

  return `https://www.google.com/maps/dir/?api=1&${destinationParam}&${originParam}&${waypointsParam}`;
};

export const IdInput = () => {
  const [locationResponse, setLocationResponse] = useState<
    Array<MinimalLocationObject>
  >([]);

  const handleTextChange = (routeId: string) => {
    if (routeId.length >= 36) {
      getLocationPings(routeId).then((pings) => {
        setLocationResponse(pings);
      });
    }
  };

  useEffect(() => {
    if (locationResponse?.length > 0) {
      const gMapsUrl = buildWaypointsUrl(locationResponse);
      openURL(gMapsUrl).catch((error) => console.error(error));
    }
  }, [locationResponse]);

  return (
    <View style={styles.container}>
      {locationResponse.length > 0 ? (
        <View>
          <Text>{JSON.stringify(locationResponse)}</Text>
          <Button title="Refresh" onPress={() => setLocationResponse([])} />
        </View>
      ) : (
        <TextInput
          style={styles.textInput}
          inputMode="numeric"
          placeholder="123456"
          autoFocus
          maxLength={36}
          onChangeText={(text) => handleTextChange(text)}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    display: 'flex',
    fontSize: 16
  }
});
