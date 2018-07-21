import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Auth, { UserContext } from './components/Auth/Auth';
import { UserStack, GuestStack } from './components/Routes'

export default class App extends React.Component {
  render() {
    const UserConsumer = UserContext.Consumer
    return (
      <View style={styles.container}>
        <Auth>
          <UserConsumer>
            {session => (
                ((session == '') ? <UserStack session={session}> </UserStack> : <GuestStack></GuestStack>)
            )}
          </UserConsumer>
        </Auth>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});