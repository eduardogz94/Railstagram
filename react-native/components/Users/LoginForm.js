import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'
import Error from '../Extra/ErrorBoundary'
import { fetching } from '../Extra/Fetch'

export default class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.username = React.createRef();
        this.password = React.createRef();
        this.password_confirmation = React.createRef();
    }
    
    logIn = (event) => {
        event.preventDefault()
    
        const options = { 
            username:this.username.current.value,
            password:this.password.current.value,
            password_confirmation:this.password_confirmation.current.value
        }
        console.log(options)
        // fetching(options, 'POST', 'http://localhost:4000/api/v1/login', response => {
        //     console.log(response)
        //     console.log('welcome to Rail API!')
        // })
    }

    render() {
        return (
            <Error>
                <View>
                    <Text> Login </Text>
                    <TextInput 
						ref={this.username}
						placeholder = 'Username'
					/>
					<TextInput 
						ref={this.password}
						placeholder = 'Password'
					/>
					<TextInput 
						ref={this.password_confirmation}
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