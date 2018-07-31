import React, { Component }from 'react'
import { ScrollView, Image, Text } from 'react-native'
import { Button, Container, Icon, Content, Form, Item, Input, Label } from 'native-base';
import { FormValidationMessage } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo'

import Error from '../Extra/ErrorBoundary'

import { sign } from '../Fetch/Requests'

import { formStyle } from '../../assets/css/form'

import Auth from '../Auth/Auth';
const auth = new Auth()

export default class SignupForm extends Component {
    constructor(){
		super()
		this.state = {
			passwords_error: '',
			username_error: '',
			email_error: '',
			username: '',
			email:'',
			password: '',
			password_confirmation: '',
			image: null,
			type: null
		}
	}
    
	signUp = (event) => {
		event.preventDefault()
		const { username, email, password, password_confirmation, type, image } = this.state
		this.setErrors()

		if (this.checkInputs()) {
			if (password === password_confirmation) {

				const options = {
					email, 
					username: username,
					password_digest: password,
					picture: image,
					type: type
				}
				
				sign(options, response => {
					if (response !== false) {
						alert('You have registered! Please log in')
						this.props.navigation.navigate('Login')
					} else {
						this.setState({username_error: 'Username already exist'})
					}
				})
					
			} else {
				this.setState({passwords_error: 'Passwords didnt match'})
			}
		}
	}

	checkInputs = () => {
		const { email, username, password, password_confirmation } = this.state;
		
		(username !== '' && password !== '' && password_confirmation !== '' && email !== '')
			? data = true 
			: data = false

		return data;
	}

	setErrors = () => {
		const { email, username, password, password_confirmation } = this.state

		username == '' ? this.setState({username_error:'Cant be blank'}) 
			: this.setState({username_error: ''})

		password == '' ? this.setState({passwords_error:'Cant be blank and both must be equals'}) 
			: this.setState({passwords_error:''})

		password_confirmation == '' ? this.setState({passwords_error:'Cant be blank and both must be equals'}) 
			: this.setState({passwords_error:''})
		password_confirmation == '' ? this.setState({passwords_error:'Cant be blank and both must be equals'}) 
			: this.setState({passwords_error:''})

		email == '' ? this.setState({email_error:'Cant be blank'}) 
			: this.setState({email_error:''})
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
			<ScrollView>
				<Container>
					<Content>
						<Form>
							<Item floatingLabel>
								<Label>Email</Label>
								<Input 
									onChangeText={email => this.setState({email})}
									autoCapitalize={'none'} />
							</Item>
							<FormValidationMessage>{this.state.email_error}</FormValidationMessage>      
							
							<Item floatingLabel>
								<Icon active style={formStyle.buttons} name='ios-person'/>
								<Label>Username</Label>
								<Input 
									onChangeText={username => this.setState({username:username})}
									autoCapitalize={'none'} />
							</Item>
							<FormValidationMessage>{this.state.username_error}</FormValidationMessage>      
							
							<Item floatingLabel>
								<Icon active style={formStyle.buttons} name='key'/>  
								<Label>Password</Label>
								<Input 
									onChangeText={password => this.setState({password:password})}
									secureTextEntry={true} 
									autoCapitalize={'none'} />
							</Item>
							<FormValidationMessage>{this.state.passwords_error}</FormValidationMessage>

							<Item floatingLabel>
								<Icon active style={formStyle.buttons} name='key'/>  
								<Label>Password Confirmation</Label>
								<Input 
									onChangeText={password_confirmation => this.setState({password_confirmation:password_confirmation})}
									secureTextEntry={true} 
									autoCapitalize={'none'} />
							</Item>
							<FormValidationMessage>{this.state.passwords_error}</FormValidationMessage>
							
							<Button
								block bordered dark
								style={formStyle.buttonContainer}
								onPress={this.pickImage}>
								<Text>Pick your avatar!</Text>
								<Icon style={formStyle.buttons} name="ios-camera"></Icon>
							</Button>	
							{image &&
							<Image source={{ uri: show }} 
								style={formStyle.image} />
							}
		
							<Button
								block bordered dark
								style={formStyle.buttonContainer}
								onPress={this.signUp}>
								<Text>Sign up now!</Text>
								<Icon style={formStyle.buttons} name="ios-log-in"></Icon>
							</Button>	

						</Form>
						<Text>Already signed up?</Text>

					</Content>	
			</Container>						
			</ScrollView>
		</Error>
		)
  	}

}
