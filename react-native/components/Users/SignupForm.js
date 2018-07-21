import React, { Component }from 'react'
import { ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { FormValidationMessage } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo'

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
			password_confirmation: '',
			image: null,
			type: null
		}
	}
	
    
	signUp = (event) => {
		event.preventDefault()
		const { password, password_confirmation, type, picture } = this.state
		this.checkValues()
		if (this.checkInputs()) {
			if (password === password_confirmation) {

				const options = {
					username: username,
					password_digest: password,
					picture: image,
					type: type
				}

				fetching(options, 'POST', `${myIp}/api/v1/signup`, response => {
					response.status == 200 
						? (console.log(response), 
							console.log('welcome to Rail API!'))
						: this.setState({username_error: 'Username already exist'})
				})	
			} else {
				this.setState({passwords_error: 'Passwords didnt match'})
			}
		}
	}

	checkInputs = () => {
		const { username, password, password_confirmation } = this.state;
		
		(username !== '' && password !== '' && password_confirmation !== '')
			? data = true 
			: data = false

		return data;
	}

	setErrors = () => {
		const { username, password, password_confirmation } = this.state

		username == '' ? this.setState({username_error:'Cant be blank'}) 
			: this.setState({username_error: ''})

		password == '' ? this.setState({passwords_error:'Cant be blank and both must be equals'}) 
			: this.setState({passwords_error:''})

		password_confirmation == '' ? this.setState({passwords_error:'Cant be blank and both must be equals'}) 
			: this.setState({passwords_error:''})
	} 
	
	pickImage = async () => {
	const status =  Permissions.askAsync(Permissions.CAMERA_ROLL).then(async data => {
		console.log(data)
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
			base64: true
		});
	
		
		if (!result.cancelled) {
			const type = result.uri.substr(result.uri.indexOf('.')+1)
			type = (type == 'jpg') ? 'jpeg' : type 
			console.log(type)
			this.setState({ image:result.base64, show:result.uri, type });
		}
	}).catch(err => {
	    console.log(err)
	})
	}

  	render() {
		let { image, show } = this.state;

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
						title="Pick an image from camera roll"
						onPress={this.pickImage}
						/>
					{image &&
					<Image source={{ uri: show }} style={{ width: 200, height: 200 }} />}
   
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
