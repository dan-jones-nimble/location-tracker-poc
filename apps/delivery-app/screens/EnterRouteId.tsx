import { IdInput } from '../components';
import { LocationTrackingWrapper } from '@nx-expo/context';

export const EnterRouteIdScreen = () => {
  return (
    <LocationTrackingWrapper>
      <IdInput />
    </LocationTrackingWrapper>
  );
};
