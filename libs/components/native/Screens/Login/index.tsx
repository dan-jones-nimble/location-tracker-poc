// Import
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

// Context
import { useLoggedIn } from '@nx-expo/context';

// Appwrite
import { emailLogin, ICredentials } from '@nx-expo/appwrite';

// Components
import { WobbleButton } from '../../WobbleButton';

export const LoginScreen = () => {
  const [credentials, setCredentials] = useState<ICredentials>({
    email: '',
    password: ''
  });
  const { logIn } = useLoggedIn();

  const handleInput = (name: string, value: string) => {
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitCredentials = () => {
    return emailLogin({
      email: credentials.email,
      password: credentials.password
    })
      .then(logIn)
      .catch((e) => {
        console.log(e);
        return true;
      });
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => handleInput('email', text)}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          autoFocus
          inputMode="email"
          keyboardType="email-address"
          returnKeyType="next"
          textAlign="center"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => handleInput('password', text)}
          aria-hidden
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="current-password"
          returnKeyType="done"
          secureTextEntry
          textAlign="center"
        />
      </View>
      <WobbleButton title="Log In" onPress={submitCredentials} />
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
