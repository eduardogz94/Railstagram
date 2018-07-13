import React from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'

import Title from '../Extra/HomeTitle'

class SignupForm extends React.Component {
    constructor(){
        super()
        this.username = '',
        this.password = '',
        this.password_confirmation = ''

    }
    
	signUp = (event) => {
	    event.preventDefault()

        const options = {
            username: this.username,
            password_digest: this.password,
        }

        fetching(options, 'POST', `http://${myIp}/api/v1/signup`, response => {
			response.status == 200 ?
            (console.log(response),  
			console.log('welcome to Rail API!'))
			: console.log('invalid')
        })
	}

  	render() {
		return (
			<Error>
				<View style={styles.container}>
					<Title tagline='Sigup Form'/>
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
						onPress={this.signUp}
                        title = 'Sign up'
                        ></Button>
				</View>
			</Error>
		)
  	}

}

const styles = StyleSheet.create({
	container: {
		flex: 3,
		backgroundColor: '#fff',
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
});

export default  SignupForm;		