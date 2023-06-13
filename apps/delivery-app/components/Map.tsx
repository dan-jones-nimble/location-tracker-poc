import { RouteObject } from '@nx-expo/appwrite';
import MapView, { Marker, Polyline, Provider, Region } from 'react-native-maps';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useMemo, useState } from 'react';

interface MapProps {
  route: RouteObject;
  provider: Provider;
}

export const Map = ({ route, provider }: MapProps) => {
  const locationPings = route.location_pings;
  const { height, width } = useWindowDimensions();
  const ASPECT_RATIO = useMemo(() => width / height, [width, height]);
  const [currentRegion, setCurrentRegion] = useState<Region>({
    latitude: locationPings[0].latitude,
    longitude: locationPings[0].longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01 * ASPECT_RATIO
  });

  return (
    <MapView
      style={StyleSheet.absoluteFill}
      initialRegion={currentRegion}
      onRegionChange={(region) => setCurrentRegion(region)}
      provider={provider}
      loadingEnabled
      showsUserLocation
      showsPointsOfInterest={false}
    >
      <Polyline
        coordinates={locationPings.map((locationPing) => ({
          latitude: locationPing.latitude,
          longitude: locationPing.longitude
        }))}
      />
      {locationPings.map((locationPing) => (
        <Marker
          key={locationPing.$id}
          coordinate={{
            longitude: locationPing.longitude,
            latitude: locationPing.latitude
          }}
        />
      ))}
    </MapView>
  );
};
