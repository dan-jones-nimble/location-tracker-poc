// Imports
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { requestPermissions } from '@nx-expo/location';

export const TrackerPrompt = () => {
  const [text, setText] = useState<string>('You must accept tracking');

  useEffect(() => {
    requestPermissions()
      .then(() => setText('You are being tracked...'))
      .catch((e) => setText(`You aren't being tracked...\n${e.message}`));
  }, []);

  return <Text>{text}</Text>;
};
