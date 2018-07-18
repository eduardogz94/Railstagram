import React, { Component }from 'react'
import { ScrollView } from 'react-native'
import { Button, FormValidationMessage } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'
import Title from '../Extra/HomeTitle'

import Auth from '../Auth/Auth';
import UserInputs from './Inputs'

import { inputs , butons } from '../../assets/css/styles'

const auth = new Auth()

export default class SignupForm extends Component {
    constructor(){
		super()
		this.state = {
			passwords_error: '',
			username_error: '',
			username: '',
			password: '',
			password_confirmation: ''
		}
	}
	
    
	signUp = (event) => {
		event.preventDefault()
		this.checkValues()
		if (this.state.password === this.state.password_confirmation) {
			
			const options = {
				username: this.state.username,
				password_digest: this.state.password,
			}
			
			fetching(options, 'POST', `${myIp}/api/v1/signup`, response => {
				
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

	checkValues = () => {
		const { username, password, password_confirmation } = this.state
		username == '' ? this.setState({username_error:'Cant be blank'}) 
			: this.setState({username_error: ''})

		password == '' ? this.setState({passwords_error:'Cant be blank and both must be equals'}) 
		: this.setState({passwords_error:''})
	} 

  	render() {
		return (
		<Error>
			<ScrollView style={inputs.inputWrapper}>

				<Title tagline='Sigup Form'/>
					<UserInputs
						label='Username' 
                        onChangeText={username => this.setState({username:username})}
                        placeholder = 'Username'
                        autoCapitalize={'none'}
					/>
					<FormValidationMessage>{this.state.username_error}</FormValidationMessage>
					
					<UserInputs
						label='Password'
                        onChangeText={password => this.setState({password:password})}
                        placeholder = 'Password'
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                    />
					<FormValidationMessage>{this.state.passwords_error}</FormValidationMessage>

					<UserInputs
						label='Password Confirmation'
                        onChangeText={password_confirmation => this.setState({password_confirmation:password_confirmation})}
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

			</ScrollView>
		</Error>
		)
  	}

}