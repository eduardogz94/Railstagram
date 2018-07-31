import React , { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Text,TouchableOpacity, StyleSheet } from 'react-native';
import { newSession, currentUser } from '../Fetch/Requests';

export const UserContext = React.createContext({
    token: null,
    setSession: () => {},
    removeSession: () => {}
});

class Auth extends Component {
    state = {
        token: null,
        setSession: (email, password) => {
            newSession({email, password}, token => {
                if (token != false) {
                    currentUser(token, async result => {
                        try {
                            await AsyncStorage.multiSet([['session', result.id.toString()], ['token', token]])
                            this.props.update(token)
                            this.setState({ token })
                        } catch (e) {
                            alert(e)
                        }
                    })
                }
            })
        },
        removeSession: async () => {
            try {
                await AsyncStorage.clear()
                this.props.update(null)
            } catch (e) {
                alert(e)
            }
        }
    }
    
    getItem = async (key) => {
        try {
            const data = await AsyncStorage.getItem(key)
            return data;    
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default Auth