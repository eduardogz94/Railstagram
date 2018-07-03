import React from 'react';
import { Text, View, TextInput, Button } from 'react-native'
import Error from '../Extra/ErrorBoundary'
import { fetching } from '../Extra/Fetch'

export default class FindUser extends React.Component {
	constructor(){
		super()
		this.id = ''
	}

	show = (event) => {
        event.preventDefault()
      console.log(this.id)
      
    //   fetching({}, 'GET', `http://10.172.175.155:4000/api/v1/users/${this.id}`, response => {
    //     console.log(response)
    //   })
	  
	}

	render() {
		return (
			<Error>
				<View>
					<Text>Rails API Search users</Text>
						<TextInput 
							onChangeText={id => this.id = id}
							placeholder = 'Id of user'
						/>
						<Button 
							onPress={this.show}
                            title = 'Search'
                            />
				</View>
			</Error>
		);
	}
}
