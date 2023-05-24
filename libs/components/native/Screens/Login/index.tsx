// Import
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

// Context
import { useLoggedIn } from '@nx-expo/context';

// Appwrite
import { emailLogin, ICredentials } from '@nx-expo/appwrite';
import { Button } from '../../Button';

export const LoginScreen = () => {
  const [credentials, setCredentials] = useState<ICredentials>({
    email: '',
    password: ''
  });
  const [triggerWobble, setTriggerWobble] = useState<boolean>(false);
  const { logIn } = useLoggedIn();

  const handleInput = (name: string, value: string) => {
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setTriggerWobble(false);
  };

  const submitCredentials = async () => {
    emailLogin({
      email: credentials.email,
      password: credentials.password
    })
      .then(logIn)
      .catch(() => setTriggerWobble(true));
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textInput}
          onChange={(e) => handleInput('email', e.nativeEvent.text)}
          autoCapitalize="none"
          autoComplete="email"
          autoFocus
          textAlign="center"
        />
        <TextInput
          style={styles.textInput}
          onChange={(e) => handleInput('password', e.nativeEvent.text)}
          aria-hidden
          autoCapitalize="none"
          autoComplete="current-password"
          textAlign="center"
        />
      </View>
      <Button
        title="Log In"
        onPress={submitCredentials}
        triggerWobble={triggerWobble}
      />
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
