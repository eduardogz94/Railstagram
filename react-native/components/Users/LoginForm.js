import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { Button, FormValidationMessage } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'

import { login } from '../Fetch/Requests'

import Auth from '../Auth/Auth';

import UserInputs from './Inputs'

import { butons, inputs } from '../../assets/css/styles'

const auth = new Auth()

export default class LoginForm extends Component {

    constructor(){
        super()  

        this.state = {
            passwords_error: '',
            username_error: '',
            username: '',
            password: ''
        }
    }

    logIn = (event) => {
        event.preventDefault()
        const { username, password } = this.state;
        this.setErrors()
        
        if (this.checkInputs()) {
            const options = { 
                username: username,
                password: password
            }
            
            login(options, response => {
                if (response !== false) {
                    auth.setItem('session',JSON.stringify(response))
                    this.props.navigation.navigate('Home')
                } else {
                    this.setState({username_error: 'Username doesnt exist'}) ;
                }
            })
        }
    }

    checkInputs = () => {
        const { username, password } = this.state;

        (username !== '' && password !== '')
            ? data = true 
            : data = false

        return data;
    }

    setErrors = () => {
        const { username, password } = this.state

        username == '' ? this.setState({username_error:'Cant be blank'}) 
            : this.setState({username_error: ''})

        password == '' ? this.setState({passwords_error:'Cant be blank'}) 
            : this.setState({passwords_error:''})
    }  

    render() {
        return (
        <Error>
            <ScrollView style={inputs.inputWrapper}>
					<UserInputs 
                        label='Username'
                        onChangeText={username => this.setState({username:username})}
                        placeholder = 'Username'
                        autoCapitalize={'none'}/>
                    <FormValidationMessage>{this.state.username_error}</FormValidationMessage>
				
                    <UserInputs 
                        label='Password'
                        onChangeText={password => this.setState({password:password})}
                        placeholder = 'Password'
                        secureTextEntry={true}
                        autoCapitalize={'none'}/>
                    <FormValidationMessage>{this.state.passwords_error}</FormValidationMessage>

                    <Button style={{marginTop: 50}}
                        onPress={this.logIn}
                        title = 'Log in'
                    />
                    <Text>Havent signup yet?</Text>
            </ScrollView>
        </Error>
        )
    }
}
