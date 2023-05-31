// Imports
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo-router';

// Components
import { TrackingScreen } from '../screens';
import { LoginScreen } from '@nx-expo/components';

// Contexts
import { useLoggedIn } from '@nx-expo/context';

// Appwrite
import { getAccount } from '@nx-expo/appwrite';

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const { isLoggedIn, logIn } = useLoggedIn();

  const getUser = useCallback(async () => {
    const account = await getAccount();
    if (account) logIn();
    setLoading(false);
  }, [logIn]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <View style={styles.container}>
      {loading && <SplashScreen />}
      {!loading && !isLoggedIn && <LoginScreen />}
      {!loading && isLoggedIn && <TrackingScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  }
});
