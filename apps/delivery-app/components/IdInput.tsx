// import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { getLocationPings } from '@nx-expo/appwrite';
import { useState, useEffect } from 'react';
import { LocationObject } from 'expo-location';
import getDirections from 'react-native-google-maps-directions';

export const IdInput = () => {
  // const router = useRouter();
  const [locationResponse, setLocationResponse] =
    useState<Array<LocationObject>>();

  const handleTextChange = (routeId: string) => {
    if (routeId.length >= 36) {
      getLocationPings(routeId).then((pings) => {
        // router.push(`/jobList?routeId=${routeId}`);
        setLocationResponse(pings);
      });
    }
  };

  useEffect(() => {
    if (locationResponse && locationResponse?.length > 0) {
      console.log("location response: " + JSON.stringify(locationResponse));
      const waypoints = locationResponse;
      const firstWaypoint = waypoints.shift()!;
      const lastWaypoint = waypoints.pop()!;
      const remainingWaypoints = waypoints.map(waypoint => {
        console.log("waypoint: " + JSON.stringify(waypoint));
        return {
          latitude: waypoint.latitude,
          longitude: waypoint.longitude
        }
      });
      const data = {
        source: {
          latitude: firstWaypoint.latitude,
          longitude: firstWaypoint.longitude
        },
        destination: {
          latitude: lastWaypoint.latitude,
          longitude: lastWaypoint.longitude
        },
        params: [
          {
            key: "travelmode",
            value: "driving"
          },
          {
            key: "dir_action",
            value: "navigate"
          }
        ],
        waypoints: remainingWaypoints
      }
      getDirections(data);
    }
  }, [locationResponse]);

  return (
    <View style={styles.container}>
      {locationResponse ? (
        <Text>{JSON.stringify(locationResponse)}</Text>
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
