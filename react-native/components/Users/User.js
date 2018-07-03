import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class User extends Component {
    delete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:4000/api/v1/users/${id}`)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    }
  
    render() {
    const { id, username, password_digest, created_at} = this.props.user;
    
    return (
      <View>
        <Text> {username} </Text>
        <Text>{id}</Text>
        <Text>{password_digest}</Text>
        <Text>{created_at}</Text>
        <button onClick={() => this.delete(id)}>Delete</button>
      </View>
    )
  }
}