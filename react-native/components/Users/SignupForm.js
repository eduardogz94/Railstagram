import React, { Component }from 'react'
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

export default class SignupForm extends Component {
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
	
    
	signUp = (event) => {
		event.preventDefault()
		
		if (this.password === this.password_confirmation) {
			const options = {
				username: this.username,
				password_digest: this.password,
			}
			
			fetching(options, 'POST', `http://${myIp}/api/v1/signup`, response => {
				
				response.status == 200 
					? (console.log(response), 
					   console.log('welcome to Rail API!')
					)
					: this.setState({username_error: 'Username already exist'})
			})

		} else {
			this.setState({passwords_error: 'Passwords didnt match'})
		}
	}

  	render() {
		return (
		<Error>
			<View style={inputs.inputWrapper}>

				<Title tagline='Sigup Form'/>

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

					<Button 
						style={{marginTop: 50}}
						rightIcon={{name: 'code'}}
						onPress={this.signUp}
						title = 'Sign up'
					/>

			</View>
		</Error>
		)
  	}

}