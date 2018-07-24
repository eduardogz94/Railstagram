import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Auth, { UserContext } from './components/Auth/Auth';
import { UserStack, GuestStack } from './components/Routes'
import Login from './components/Users/LoginForm'

export default class App extends React.Component {
  render() {
    const UserConsumer = UserContext.Consumer
    return (
      <View style={styles.container}>
        <Auth>
          <UserConsumer>
            {session => (
              ((session == '' || session == null) 
                  ? <GuestStack /> 
                  : <UserStack session={session}/>)
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