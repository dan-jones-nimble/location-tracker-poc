import { IdList } from '../components';
import { LocationTrackingWrapper } from '@nx-expo/context';

export const SelectRouteIdScreen = () => {
  return (
    <LocationTrackingWrapper>
      <IdList />
    </LocationTrackingWrapper>
  );
};
