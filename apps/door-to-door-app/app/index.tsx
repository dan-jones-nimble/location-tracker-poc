// Imports
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { SplashScreen } from 'expo-router';

// Components
import { TrackerPrompt } from '../components';

// Appwrite
import { getAccount, emailLogin } from '@nx-expo/appwrite';

export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });

  const handleInput = (name: string, value: string) => {
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getUser = async () => {
    const account = await getAccount();
    if (account) setIsLoggedIn(true);
    setLoading(false);
  };

  const login = async () => {
    const login = await emailLogin({
      email: credentials.email,
      password: credentials.password,
    });
    if (login?.$id) setIsLoggedIn(true);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <SplashScreen />}
      {!loading && isLoggedIn && <TrackerPrompt />}
      {!loading && !isLoggedIn && (
        <>
          <TextInput
            style={styles.textInput}
            onChange={(e) => handleInput('email', e.nativeEvent.text)}
            autoFocus
          />
          <TextInput
            style={styles.textInput}
            onChange={(e) => handleInput('password', e.nativeEvent.text)}
            aria-hidden
          />
          <Button title="Submit" onPress={login} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  textInput: {
    display: 'flex',
    fontSize: 16,
    minWidth: 300,
    borderColor: '#000',
    borderWidth: 3,
    padding: 4,
    borderRadius: 5,
  },
});
