import { Slot } from 'expo-router';
import { StatusBar } from 'react-native';

import { LoggedInWrapper } from '@nx-expo/context';

export default function HomeLayout() {
  return (
    <LoggedInWrapper>
      <StatusBar barStyle="dark-content" />
      <Slot />
    </LoggedInWrapper>
  );
}
