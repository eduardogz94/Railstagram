import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import Error from '../Extra/ErrorBoundary'
import { fetching } from '../Extra/Fetch'

export default class LoginForm extends Component {
    state = {
        username: '',
        password:'',
        password_confirmation: ''
    }

    logIn = (event) => {
        event.preventDefault()
        
        
        const options = { 
            username:this.state.username,
            password:this.state.password,
            password_confirmation:this.state.password_confirmation
        }
        
        console.log(options)
        
        fetching(options, 'POST', 'http://10.172.175.155:4000/api/v1/login', response => {
            console.log(response)
            console.log('welcome to Rail API!')
        })
    }

    render() {
        return (
            <Error>
                <View>
                    <Text> Login </Text>
                    <TextInput 
						onChangeText={(username) => this.setState({username})}
						placeholder = 'Username'
					/>
					<TextInput 
						onChangeText={(password) => this.setState({password})}
						placeholder = 'Password'
					/>
					<TextInput 
						onChangeText={(password_confirmation) => this.setState({password_confirmation})}
						placeholder = 'Password Confirmation'
					/>
					<Button 
						onPress={this.logIn}
                        title = 'Login'
                        ></Button>
                </View>
            </Error>
        )
    }
}