import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetching } from './Extra/Fetch'
import User from './Users/User'
import LoginForm from './Users/LoginForm'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      users: [],
      is_logged: []
    }
  }

  componentDidMount() {
      console.log('Mounted home')

      fetching({}, 'GET', 'http://192.168.1.104:4000/api/v1/users', 
      response => {
        this.setState({
          users: response
        })
      })

      fetching({}, 'GET' ,'http://192.168.1.104:4000/api/v1/is_logged?', response => {
          this.setState({
            is_logged: response
          })
        console.log(this.state.is_logged)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Rails API users</Text>
        {/* <Text>
        {this.state.users.map((user) => {
          return(
            <User user={user} key={user.id}/>)})}
        </Text> */}
        <LoginForm/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
