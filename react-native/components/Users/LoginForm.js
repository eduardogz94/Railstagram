import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import { Button } from 'react-native-elements'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'
import Title from '../Extra/HomeTitle'

import Auth from '../Auth/Auth';

import { inputs } from '../../assets/css/styles'
import { butons } from '../../assets/css/styles'

const auth = new Auth()

export default class LoginForm extends Component {
    constructor(){
        super()  

        this.state = {
            passwords_error: '',
            username_error: ''
        }
        this.username = '',
        this.password = '',
        this.password_confirmation = ''
    }

    logIn = (event) => {
        event.preventDefault()

        if (this.password === this.password_confirmation) {
            
            const options = { 
                username: this.username,
                password: this.password
            }
            
            // this.props.auth.multi(['username',username], ['logged', true])
            fetching(options, 'POST', `http://${myIp}/api/v1/login`, response => {
               
                response.status == 200 
                    ? (auth.setItem('session',this.username), 
                        this.props.navigation.navigate('Home')
                    ) 
                    : this.setState({username_error: 'Username doesnt exist'}) ;
            })
            
        } else {
            this.setState({passwords_error: 'Passwords didnt match'})
        }
    }

    render() {
        return (
        <Error>
            <View style={inputs.inputWrapper}>

                <Title tagline='Login Form'/>

                    <FormLabel>Name</FormLabel>
					<FormInput 
						style={inputs.login}
                        onChangeText={username => this.username = username}
                        placeholder = 'Username'
                        autoCapitalize={'none'}
					/>
					<FormValidationMessage>{this.state.username_error}</FormValidationMessage>
					
					<FormLabel>Password</FormLabel>
                    <FormInput style={inputs.login}
                        onChangeText={password => this.password = password}
                        placeholder = 'Password'
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                    />
					<FormValidationMessage>{this.state.passwords_error}</FormValidationMessage>

					<FormLabel>Password Confirmation</FormLabel>
                    <FormInput style={inputs.login}
                        onChangeText={password_confirmation => this.password_confirmation = password_confirmation}
                        placeholder = 'Password Confirmation'
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                    />
					<FormValidationMessage>{this.state.passwords_error}</FormValidationMessage>

                    <Button style={{marginTop: 50}}
                        onPress={this.logIn}
                        title = 'Log in'
                    />
                    
            </View>
        </Error>
        )
    }
}

