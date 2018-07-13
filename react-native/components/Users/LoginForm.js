import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'
import Title  from '../Extra/HomeTitle'

export default class LoginForm extends Component {
    constructor(){
        super()    
        this.username = '',
        this.password = '',
        this.password_confirmation = ''
    }
    

    logIn = (event) => {
        event.preventDefault()
    
        const options = { 
            username:this.username,
            // password:this.password,
            password_confirmation:this.password_confirmation
        }
        
        console.log(this.username)
        // this.props.auth.multi(['username',username], ['logged', true])
        fetching(options, 'POST', `http://${myIp}/api/v1/login`, response => {
            console.log(response)
            response.status == 200 ? (
                this.props.auth.setItem('session', this.username ),
                console.log('welcome to Rail API!')
            ) : console.log('invalid credentials') ;
        })
    }

    render() {
        return (
            <Error>
                <View>
                    <Title tagline='Login Form'/>
                    <TextInput 
						onChangeText={username => this.username = username}
						placeholder = 'Username'
					/>
					<TextInput 
						onChangeText={password => this.password = password}
						placeholder = 'Password'
					/>
					<TextInput 
						onChangeText={password_confirmation => this.password_confirmation = password_confirmation}
						placeholder = 'Password Confirmation'
					/>
					<Button 
						onPress={this.logIn}
                        title = 'Log in'
                        ></Button>
                </View>
            </Error>
        )
    }
}
