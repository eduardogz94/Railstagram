import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'
import { navigate } from 'react-navigation';

import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'
import { Usuario } from '../Routes'
export default class User extends Component {
    
  delete = (id) => {
    alert(id)
      // fetching({}, 'DELETE' , `${myIp}/api/v1/edit/${id}`,  response => {
      //   console.log(response)
      //   console.log(response.data)
      //   console.log(response.status)
      // })
  }

  getProfile = id => {

  }

  render() {
    const { id, username, created_at, picture} = this.props.user;
      return (
        <ListItem
          roundAvatar
          key={id}
          avatar = {(picture.url != null) ? `${myIp}/${picture.url}` : null}
          title={username}
          subtitle={'Hello World'}
          onPress={() => this.props.navigation.navigate('Profile')}/>
      )
  }
}