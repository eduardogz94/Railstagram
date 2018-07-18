import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'

import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'

export default class User extends Component {
    
  delete = (id) => {
    alert(id)
      // fetching({}, 'DELETE' , `${myIp}/api/v1/users/${id}`,  response => {
      //   console.log(response)
      //   console.log(response.data)
      //   console.log(response.status)
      // })
  }

  getProfile = id => {

  }

  render() {
    const { id, username, created_at} = this.props.user;
      return (
        <ListItem
          roundAvatar
          key={id}
          avatar = {`https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg`}
          title={username}
          subtitle={'Hello World'}
          onPress={() => this.delete(id)}/>
      )
  }
}