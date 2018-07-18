import React , { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Text,TouchableOpacity, StyleSheet } from 'react-native';

export const UserContext = React.createContext();

export default class Auth extends Component {
  constructor() {
    super()
    this.state = {
      session: ''
    }
  }  

  componentDidMount = () => {
    this.getItem('session').then(data => {
      this.setState({session:data})
      console.log(this.state)
    }).done();
  }
  
  async getItem(key) {
    try {
      const data = await AsyncStorage.getItem(key)
      return data;    
    } catch (error) {
      console.log(error)
    }
  }
  
  async setItem(key,item) {
    try {
      const data = await AsyncStorage.setItem(key,item)
      this.state = `{${key}:${data}}`
      return data;
    } catch (error) {
      console.log(error)
    }
  }

  async multi(...items) {
    try {
      console.log(items)
      const data = await AsyncStorage.multiSet(...items)
      
      console.log(data)
      // this.setState({
      //   session: data
      // })
      // return data;
    } catch (error) {
      console.log(error)
    }
  }

  async resetSession() {
    try{
      await AsyncStorage.removeItem('session')

      this.getItem('session').then(data => {
        console.log(data)
        this.setState({session:data})
        console.log(this.state)
      }).done();

    } catch (error) {
      console.log(error)
    }
  }  

  checkSession() {
    this.getItem('session').then(data => {
      console.log(data)
      if (data !== null) {
        alert(data)
          return data;
      } else {
        throw new Error('No session found');
      }
    }).done()
  }

    render() {
    return (
      <UserContext.Provider value={this.state.session}>
{/*           
          <TouchableOpacity onPress={() => this.checkSession()}>
            <Text style={styles.text} >check session</Text>
          </TouchableOpacity> */}
          
          <TouchableOpacity onPress={() => this.resetSession()}>
            <Text style={styles.text}>reset session</Text>
          </TouchableOpacity>
          
          <Text style={styles.text}>{this.state.session}</Text>
          {this.props.children}
      
      </UserContext.Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text:{
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 150,
    marginTop: 30,
  }
});
