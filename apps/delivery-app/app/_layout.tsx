// Components
import { DefaultAppLayout } from '@nx-expo/components';
import { Slot } from 'expo-router';

export default () => (
  <DefaultAppLayout>
    <Slot />
  </DefaultAppLayout>
);
