import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'

import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'
export default class User extends Component {
    
  delete = (id) => {
    alert(id)
      // fetching({}, 'DELETE' , `${myIp}/api/v1/edit/${id}`,  response => {
      //   console.log(response)
      //   console.log(response.data)
      //   console.log(response.status)
      // })
  }

  render() {
    const { id, username, picture} = this.props.user;
      return (
        <ListItem
          roundAvatar
          key={id}
          avatar = {(picture.url != null) ? `${myIp}/${picture.url}` : null}
          title={username}
          subtitle={'Hello World'}
          onPress={() => this.props.getProfile(id)}
          />
      )
  }
}