import React from 'react';
import {  View, ScrollView } from 'react-native'
import { List, SearchBar } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'

import User from '../Users/User'

export default class FindUser extends React.Component {
	constructor(){
		super()
		this.state = {
			users: []
		}
	}	

	show = (username) => {
		fetching({}, 'GET', `${myIp}/api/v1/users/find/${username}`, response => {
			response.status == 200  
				? this.setState({users:[response.user]})
				: console.log('not true')
		})
	}

	render() {
		return (
			<Error>
				<View>
					<SearchBar
						lightTheme
						round
						autoCapitalize={'none'}
						onChangeText={username => this.show(username)}
						onClearText={username => this.show(username)}
						placeholder='Type Here...' />

					<ScrollView>
							<List>
								{this.state.users.map((user) => {
									return(
									<User user={user} key={user.id}/>)
								})}
							</List>
					</ScrollView>

				</View>
			</Error>
		);
	}
}