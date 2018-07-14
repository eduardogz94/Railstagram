import React, { Component } from 'react'
import { View, TextInput } from 'react-native'
import { Button } from 'react-native-elements'

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
                        this.props.navigation.navigate('Home')) 
                    : console.log('invalid credentials') ;
            })
            
        } else {
            console.log('password doesnt match')
        }
    }

    render() {
        return (
        <Error>
            <View style={inputs.inputWrapper}>

                <Title tagline='Login Form'/>

                    <TextInput style={inputs.login}
                        onChangeText={username => this.username = username}
                        placeholder = 'Username'
                        autoCapitalize={'none'}
                        autoCorrect={false}
                    />
                    <TextInput style={inputs.login}
                        onChangeText={password => this.password = password}
                        placeholder = 'Password'
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                    />
                    <TextInput style={inputs.login}
                        onChangeText={password_confirmation => this.password_confirmation = password_confirmation}
                        placeholder = 'Password Confirmation'
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                    />
                    <Button style={{marginTop: 50}}
                        onPress={this.logIn}
                        title = 'Log in'
                    />
                    
            </View>
        </Error>
        )
    }
}

