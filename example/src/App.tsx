import * as React from 'react';

import { StyleSheet, SafeAreaView } from 'react-native';
import Verisync from 'verisync-react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Verisync
        clientId="your client id"
        flowId="your flow id"
        redirectUrl="your redirect url"
        email="logged in user email"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
