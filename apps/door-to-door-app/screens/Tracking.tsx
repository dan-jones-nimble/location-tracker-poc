import { LocationTrackingWrapper } from '@nx-expo/context';
import { TrackerPrompt } from '../components';

export const TrackingScreen = () => (
  <LocationTrackingWrapper>
    <TrackerPrompt />
  </LocationTrackingWrapper>
);
