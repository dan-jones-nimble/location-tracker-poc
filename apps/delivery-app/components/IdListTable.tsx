import { View, Text, StyleSheet, Pressable } from 'react-native';
import { RouteObject } from '@nx-expo/appwrite';

interface IdListTableProps {
  routes: Array<RouteObject>;
  onIdClick: (routeId: string) => void;
}

export const IdListTable = ({ routes, onIdClick }: IdListTableProps) => {
  return (
    <View style={styles.tableView}>
      {routes.map((route) => (
        <Pressable key={route.$id} onPress={() => onIdClick(route.$id)}>
          <Text style={styles.text}>{route.$id}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableView: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    height: 2,
    width: '80%',
    backgroundColor: 'grey'
  },
  highlighted: {
    backgroundColor: 'light-grey'
  },
  text: {
    fontSize: 16,
    lineHeight: 16,
    color: 'black'
  }
});
