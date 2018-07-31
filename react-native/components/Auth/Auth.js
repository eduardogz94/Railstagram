import React , { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Text,TouchableOpacity, StyleSheet } from 'react-native';
import { newSession } from '../Fetch/Requests';

export const UserContext = React.createContext({
    token: null,
    setSession: () => {},
});

class Auth extends Component {
    state = {
        token: null,
        setSession: (email, password) => {
            newSession({email, password}, async token => {
                if (token != false) {
                    try {
                        await AsyncStorage.setItem('token', token)
                        this.setState({ token })
                    } catch (e) {
                        alert(e)
                    }
                }
            })
        },
    }
 
    // getItem = async (key) => {
    //     try {
    //     const data = await AsyncStorage.getItem(key)
    //     return data;    
    //     } catch (error) {
    //     console.log(error)
    //     }
    // }
    
    // setItem = async (key,item) => {
    //     try {
    //     await AsyncStorage.setItem(key,item)
    //     this.state = `{${key}:${item}}`
    //     console.log(this.state)
    //     } catch (error) {
    //     console.log(error)
    //     }
    // }

    // logged = async (session,id) => {
    //     try {
    //     console.log(session)
    //     console.log(id)
    //     await AsyncStorage.multiSet(['session', session], ['id', id])
    //     this.state = {session:session, id:id}
    //     } catch (error) {
    //     console.log(error)
    //     }
    // }

    // resetSession = async () => {
    //     try{
    //     await AsyncStorage.clear()
    //     this.setState({session:''})
    //     console.log(this.state)
    //     } catch (error) {
    //     console.log(error)
    //     }
    // }  

    // checkSession() {
    //     this.getItem('session').then(data => {
    //     if (data !== null) {
    //         console.log(data)
    //         return data;
    //     } else {
    //         throw new Error('No session found');
    //     }
    //     }).done()
    // }

        render() {
            return (
                <UserContext.Provider value={this.state}>
                <Text> {this.state.token} </Text>
                    {this.props.children}
                </UserContext.Provider>
            )
        }
    }

export default Auth