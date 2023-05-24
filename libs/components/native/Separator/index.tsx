import { StyleSheet, View } from 'react-native';

export const Separator = () => <View style={style.separator} />;

const style = StyleSheet.create({
  separator: {
    marginVertical: 20,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});
