import { IdList, MapModal, Map } from '../components';
import { LocationTrackingWrapper } from '@nx-expo/context';
import { useMemo, useState } from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import {
  getAllRoutes,
  MinimalLocationObject,
  RouteObject
} from '@nx-expo/appwrite';
import { openURL } from 'expo-linking';
import { Separator } from '@nx-expo/components';
import { PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';

export const SelectRouteIdScreen = () => {
  const [routes, setRoutes] = useState<Array<RouteObject>>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [mapType, setMapType] = useState<'ios' | 'google'>(
    Platform.OS === 'ios' ? 'ios' : 'google'
  );

  const selectedRoute = useMemo(
    () => routes.find((route) => route.$id === selectedRouteId),
    [routes, selectedRouteId]
  );

  const onFetchRoutesPress = () =>
    getAllRoutes().then((routes) => setRoutes(routes.documents));
  const onIdPress = (routeId: string) => {
    setSelectedRouteId(routeId);
    setIsModalVisible(true);
  };
  const onModalClose = () => setIsModalVisible(false);
  const onConfirmPreviewPress = () => {
    const gMapsUrl = buildGMapsUrl(selectedRoute.location_pings);
    openURL(gMapsUrl).catch((error) => console.error(error));
  };
  const onChangeMapPress = () =>
    setMapType(mapType === 'ios' ? 'google' : 'ios');

  return (
    <LocationTrackingWrapper>
      <View>
        <Button title="Fetch Routes" onPress={() => onFetchRoutesPress()} />
        {routes.length > 0 && (
          <>
            <Separator />
            <View style={styles.container}>
              <Text style={styles.text}>Select a route to preview:</Text>
              <IdList routes={routes} onIdClick={onIdPress} />
            </View>
          </>
        )}
      </View>
      <MapModal
        isVisible={isModalVisible}
        onClose={onModalClose}
        title={selectedRouteId}
      >
        <View style={styles.overlayContent}>
          <Map
            route={selectedRoute}
            provider={mapType === 'google' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          />
          <View style={styles.buttonContainer}>
            <Button onPress={onConfirmPreviewPress} title="Select this route" />
            <Button onPress={onChangeMapPress} title="Change Map" />
            <Button onPress={onModalClose} title="Cancel" />
          </View>
        </View>
      </MapModal>
    </LocationTrackingWrapper>
  );
};

const buildGMapsUrl = (waypoints: Array<MinimalLocationObject>) => {
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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 20
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  overlayContent: {
    height: '95%',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonContainer: {
    backgroundColor: '#ffffff99',
    borderRadius: 16,
    flexDirection: 'column',
    gap: 8,
    marginBottom: 40
  }
});
