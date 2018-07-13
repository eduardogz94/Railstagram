import React from 'react';
import { StyleSheet, View } from 'react-native';

import { UserStack } from './components/Routes'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <UserStack/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
