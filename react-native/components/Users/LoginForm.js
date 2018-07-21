import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { FormValidationMessage } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'
import Title from '../Extra/HomeTitle'

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
            
            fetching(options, 'POST', `${myIp}/api/v1/login`, response => {
                response.status == 200 
                    ? ( auth.setItem('session',JSON.stringify(response.user.id)),
                        this.props.navigation.navigate('Home')) 
                    : this.setState({username_error: 'Username doesnt exist'}) ;
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
                <Title tagline='Login Form'/>
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
                        title = 'Log in'/>
            </ScrollView>
        </Error>
        )
    }
}

