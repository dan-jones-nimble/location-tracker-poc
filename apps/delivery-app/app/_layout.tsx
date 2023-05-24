import { Slot } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { LoggedInWrapper } from '@nx-expo/context';

export default function HomeLayout() {
  return (
    <LoggedInWrapper>
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar barStyle="dark-content" />
        <Slot />
      </SafeAreaView>
    </LoggedInWrapper>
  );
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 }
});
