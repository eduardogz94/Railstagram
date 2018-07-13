import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { myIp } from './Extra/MyIp'
import { fetching } from './Extra/Fetch'

import User from './Users/User'
import LoginForm from './Users/LoginForm'
import SignupForm from './Users/SignupForm'
import FindUser from './Users/FindUser'

import Auth, { UserContext } from './Auth/Auth';

const auth = new Auth()

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }
  
  componentDidMount() {
    
    fetching({}, 'GET', `http://${myIp}/api/v1/users`,
    response => {
      console.log(response)
      this.setState({
        users: response.user
      })
      
      // console.log(response.status)
      // console.log(response.user)
    })
    
    
    // const session = auth.getItem('session')
    // console.log(session)
  }
  
  render() {
    const UserConsumer = UserContext.Consumer
    return (
      <View style={styles.container}>
        <Text>Rails API users</Text>
          {/* <Text>
          {this.state.users.map((user) => {
            return(
              <User user={user} key={user.id}/>)})}
          </Text> */}
<Auth>
  <UserConsumer>
    {session => <Text>[{session}]</Text>}
  </UserConsumer>
</Auth>
        <LoginForm auth={auth} />
        <SignupForm/>
        {/* <FindUser/> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
