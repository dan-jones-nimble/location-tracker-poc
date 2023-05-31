// import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { getLocationPings } from '@nx-expo/appwrite';
import { useState } from 'react';
import { LocationObject } from 'expo-location';

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
