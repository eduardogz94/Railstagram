import React, { Component }from 'react'
import { View, TextInput, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo'
import imageType from 'image-type'

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
			username_error: '',
			image: null,
			type: null
		}
        this.username = '',
        this.password = '',
        this.password_confirmation = ''
	}
	
    
	signUp = (event) => {
		event.preventDefault()
		console.log(this.username)
		if (this.password === this.password_confirmation) {

			const options = {
				username: this.username,
				password_digest: this.password,
				picture: this.state.image,
				type: this.state.type
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

	_pickImage = async () => {
        // const status =  Permissions.askAsync(Permissions.CAMERA_ROLL).then(async data => {
            // console.log(data)
            let result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
			  aspect: [4, 3],
			  base64: true
            });
        
			
            if (!result.cancelled) {
				let type = result.uri.substr(result.uri.indexOf('.')+1)
				type = (type == 'jpg') ? 'jpeg' : type 
				this.setState({ image:result.base64, show:result.uri, type });
            }
        // }).catch(err => {
        //     console.log(err)
        // })
  	};

  	render() {
		let { image, show } = this.state;

		return (
		<Error>
			<ScrollView>
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
						title="Pick an image from camera roll"
						onPress={this._pickImage}
						/>
					{image &&
					<Image source={{ uri: show }} style={{ width: 200, height: 200 }} />}
   
					<Button 
						style={{marginTop: 50}}
						rightIcon={{name: 'code'}}
						onPress={this.signUp}
						title = 'Sign up'
					/>

			</View>
			</ScrollView>
		</Error>
		)
  	}

}