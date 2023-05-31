import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  requestPermissions,
  startLocationTracking,
  stopLocationTracking
} from '../../location/src';

interface LocationTrackingError {
  detail: string;
  display: string;
}

interface ILocationTrackingContext {
  currentlyTracking: boolean;
  locationTrackingError?: LocationTrackingError;
}

export const LocationTrackingContext = createContext<ILocationTrackingContext>({
  currentlyTracking: false
});

export const useLocationTracking = () => useContext(LocationTrackingContext);

export const LocationTrackingWrapper = ({
  children
}: {
  children: ReactNode;
}) => {
  const [locationTrackingPermitted, setLocationTrackingPermitted] =
    useState<boolean>(false);
  const [currentlyTracking, setCurrentlyTracking] = useState<boolean>(false);
  const [locationTrackingError, setLocationTrackingError] =
    useState<LocationTrackingError>(undefined);

  useEffect(() => {
    requestPermissions()
      .then(() => setLocationTrackingPermitted(true))
      .catch((error) =>
        setLocationTrackingError({
          detail: error,
          display: 'Please enable Location Services.'
        })
      );
  }, []);

  useEffect(() => {
    if (locationTrackingPermitted) {
      startLocationTracking()
        .then(() => {
          setCurrentlyTracking(true);
        })
        .catch((error) =>
          setLocationTrackingError({
            detail: error,
            display: 'Failed to start tracking Location.'
          })
        );
    }

    return () => {
      stopLocationTracking().then(() => {
        setCurrentlyTracking(false);
      });
    };
  }, [locationTrackingPermitted]);

  const contextValues = useMemo(
    () => ({
      currentlyTracking,
      locationTrackingError
    }),
    [currentlyTracking]
  );

  return (
    <LocationTrackingContext.Provider value={contextValues}>
      {children}
    </LocationTrackingContext.Provider>
  );
};
