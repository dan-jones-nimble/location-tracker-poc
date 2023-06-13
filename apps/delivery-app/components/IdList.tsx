import { IdListTable } from './IdListTable';
import { Text } from 'react-native';
import { RouteObject } from '@nx-expo/appwrite';

interface IdListProps {
  routes: Array<RouteObject>;
  onIdClick: (routeId: string) => void;
}

export const IdList = ({ routes, onIdClick }: IdListProps) => {
  return (
    <>
      {routes.length > 0 && (
        <IdListTable onIdClick={onIdClick} routes={routes} />
      )}
      {routes.length === 0 && <Text>No routes found</Text>}
    </>
  );
};
