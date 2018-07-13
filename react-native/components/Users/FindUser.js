import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native'
import Error from '../Extra/ErrorBoundary'
import { fetching } from '../Extra/Fetch'
import Title from '../Extra/HomeTitle'

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
				<View style={styles.container}>
					<Title tagline = "Rails API Search users"/>
					<TextInput 
						onChangeText={id => this.id = id}
						placeholder = 'Id of user'
					/>
					<Button 
						onPress={this.show}
						title = 'Search'/>
				</View>
			</Error>
		);
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

