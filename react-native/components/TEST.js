import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native'

const UserContext = React.createContext('logged');

class SessionProvider extends React.Component {
  state = { session: 'false' }

  toggleSession = () => {
    this.setState(({ session }) => ({
      session: session === 'logged' ? true : false,
    }))
  }
  render() {
    return (
      <UserContext.Provider value={this.state.session}>
        <TouchableOpacity onClick={this.toggleSession}>
          <Text>toggle theme</Text>
        </TouchableOpacity>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
// only doing this to shield end-users from the
// implementation detail of "context"
const UserConsumer = UserContext.Consumer

class App extends React.Component {
  render() {
    return (
      <SessionProvider>
        <UserConsumer>
          {theme => <View style={styles[theme]}>{theme}</View>}
        </UserConsumer>
      </SessionProvider>
    )
  }
}

const styles = {
  dark: {
    backgroundColor: 'black',
    color: 'white',
  },
  light: {
    backgroundColor: 'white',
    color: 'black',
  },
};
