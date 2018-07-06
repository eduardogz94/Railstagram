import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'


export default class User extends Component {
    
  delete = (id) => {

      fetching({}, 'DELETE' , `http://${myIp}/api/v1/users/${id}`,  response => {
        console.log(response)
        console.log(response.data)
        console.log(response.status)
      })
  }

  render() {
    const { id, username, created_at} = this.props.user;
      return (
        <View>
          <Text>Username {username} </Text>
          <Text>This is users id {id}</Text>
          <Text>Timestamp {created_at}</Text>
          <Button
            onPress={() => this.delete(id)}
            title="Delete User"
            color="#841584"
          />
          <Text>--------------------------</Text>
        </View>
      )
  }
}