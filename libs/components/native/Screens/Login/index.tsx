// Import
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

// Context
import { useLoggedIn } from '@nx-expo/context';

// Appwrite
import { emailLogin, ICredentials } from '@nx-expo/appwrite';

export const LoginScreen = () => {
  const { logIn } = useLoggedIn();
  const [credentials, setCredentials] = useState<ICredentials>({
    email: '',
    password: ''
  });

  const handleInput = (name: string, value: string) => {
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitCredentials = async () => {
    const attemptedEmailLogin = await emailLogin({
      email: credentials.email,
      password: credentials.password
    });
    if (attemptedEmailLogin?.$id) logIn();
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textInput}
          onChange={(e) => handleInput('email', e.nativeEvent.text)}
          autoComplete="email"
          autoFocus
          textAlign="center"
        />
        <TextInput
          style={styles.textInput}
          onChange={(e) => handleInput('password', e.nativeEvent.text)}
          aria-hidden
          autoComplete="current-password"
          textAlign="center"
        />
      </View>
      <Button title="Log In" onPress={submitCredentials} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 16
  },
  textInput: {
    display: 'flex',
    fontSize: 20,
    minWidth: '60%',
    borderColor: '#a7a7a7ee',
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 4
  }
});
