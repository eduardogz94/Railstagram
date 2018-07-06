import React , { Component } from 'react'
import { AsyncStorage } from 'react-native'

export default class Auth extends Component {
  state = {
    session: ''
  }

  async getItem(key) {
    try {

      await AsyncStorage.getItem(key).then(data => {
        
        this.state = {
          session:data
        }
        
        console.log(data)
        console.log(this.state)
        return data  
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  async setItem(key, item) {
    try {
      const jsonItem = await AsyncStorage.setItem(key,item);
  
      this.state = { 
        session:jsonItem 
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  async resetSession() {
    try{
      await AsyncStorage.removeItem('session')

      const session = await AsyncStorage.getItem('session')
      this.setState({session:session})
    } catch (error) {
      console.log(error)
    }
  }  

  checkSession() {
    const username = this.getItem('session');
    if (!username) {
      throw new Error('No session found');
    }
    return username;
  }
}
