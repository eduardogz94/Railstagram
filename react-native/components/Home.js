import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements'

import Error from './Extra/ErrorBoundary'
import { myIp } from './Extra/MyIp'
import { fetching } from './Extra/Fetch'

import User from './Users/User'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      users: []
    }
  }
  
  componentDidMount() {
    
    fetching({}, 'GET', `${myIp}/api/v1/users`, response => {
      response.status == 200 
        ? this.setState({users: response.user})
        : console.log('there was an error');
    })
  }
  
  render() {
    return (
    <Error>  
      <ScrollView>
        {this.state.users.map(user => {
          return(
              <Card key={user.id}  
                  title='HELLO WORLD'
                  image = {require('../assets/images/index.jpeg')}>
                <User user={user}/>
              </Card>
            )})}
            
      </ScrollView>
    </Error>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },


});
