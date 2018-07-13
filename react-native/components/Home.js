import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { myIp } from './Extra/MyIp'
import { fetching } from './Extra/Fetch'
import Title from './Extra/HomeTitle'


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
    
    fetching({}, 'GET', `http://${myIp}/api/v1/users`, response => {
      if (response.status == 200) {
        this.setState({
          users: response.user
        })

      } else {
        console.log('there was an error')
      }
    })
  }
  
  render() {
    const UserConsumer = UserContext.Consumer
    return (
      <View >
        <Title tagline="Rails API users" />
          <Text>
          {this.state.users.map((user) => {
            return(
              <User user={user} key={user.id}/>)})}
          </Text>

        {/* <Auth>
          <UserConsumer>
            {session => <Text>[{session}]</Text>}    
          </UserConsumer>
        </Auth>

        <LoginForm auth={auth} />
        <SignupForm auth={auth}/> */}
        {/* <FindUser auth={auth}/>  */}
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
