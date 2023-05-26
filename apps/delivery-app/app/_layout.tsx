import { Slot } from 'expo-router';
import { DefaultAppLayout } from '@nx-expo/components';

export default () => (
  <DefaultAppLayout>
    <Slot />
  </DefaultAppLayout>
);
