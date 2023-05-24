/* eslint-disable jsx-a11y/accessible-emoji */
import { useRouter } from 'expo-router';
import { StyleSheet, TextInput, View } from 'react-native';

export const IdInput = () => {
  const router = useRouter();

  const submitRouteId = (jobNumber: string) =>
    new Promise((res) => res(() => console.log(jobNumber)));

  const handleTextChange = (routeId: string) => {
    if (routeId.length >= 6) {
      submitRouteId(routeId).then(() =>
        router.push(`/jobList?routeId=${routeId}`)
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        inputMode="numeric"
        placeholder="123456"
        autoFocus
        maxLength={6}
        onChangeText={(text) => handleTextChange(text)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    display: 'flex',
    fontSize: 16,
  },
});
