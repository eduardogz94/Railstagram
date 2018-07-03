import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'
import User from './Users/User'

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
    fetch('http://localhost:4000/api/v1/users',{
      method:'GET'
    })
      .then(response => {
         response.json(),
         console.log(response)     
        }
    )
      .then(body => {
          this.setState({
            users: body.data
          })
      })
      .catch(error => console.log(error))
      
    // axios.get('http://localhost:4000/api/v1/is_logged?')
    //   .then(response => {
    //     console.log(response.data)
    //     this.setState({
    //       is_logged: response.data
    //     })
    //   }).catch(error => console.log(error))

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Rails API users</Text>
        <Text>
        {this.state.users.map((user) => {return(
            <User user={user} key={user.id}/>    )})}
        </Text>
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
