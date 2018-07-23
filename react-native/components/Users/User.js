import React, { Component } from 'react'
import { ListItem } from 'react-native-elements'
import { myIp } from '../Extra/MyIp'

export default class User extends Component {
  render() {
    const { id, username, picture} = this.props.user;
      return (
        <ListItem
          roundAvatar
          key={id}
          avatar = {(picture.url != null) ? `${myIp}/${picture.url}` : null}
          title={username}
          subtitle={'username'}
          />
      )
  }
}