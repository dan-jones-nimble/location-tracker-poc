// Imports
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

// Context
import { LoggedInWrapper } from '../../../context';

export const DefaultAppLayout: ({ children: ReactNode }) => JSX.Element = ({
  children
}) => (
  <SafeAreaView style={styles.safeAreaView}>
    <LoggedInWrapper>
      <StatusBar barStyle="dark-content" />
      {children}
    </LoggedInWrapper>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 }
});
