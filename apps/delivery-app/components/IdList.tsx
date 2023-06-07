import { useState } from 'react';
import { IdListTable } from './IdListTable';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RouteObject, getAllRoutes } from '@nx-expo/appwrite';

export const IdList = () => {
  const [routes, setRoutes] = useState<Array<RouteObject>>([]);
  const [dataFetched, setDataFetched] = useState(false);

  const handleButtonPress = () => {
    getAllRoutes().then((routes) => {
      setRoutes(routes.documents);
      setDataFetched(true);
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Fetch Routes" onPress={() => handleButtonPress()} />
      {!dataFetched && <View style={styles.hiddenView} />}
      {dataFetched && routes.length > 0 && <IdListTable routes={routes} />}
      {dataFetched && routes.length === 0 && (
        <Text style={styles.text}>No routes found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16,
    lineHeight: 16
  },
  hiddenView: {
    height: 16
  }
});
