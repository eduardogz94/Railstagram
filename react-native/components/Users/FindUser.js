import React from 'react';
import { View, ScrollView } from 'react-native'
import { List, SearchBar } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'

import { fetching } from '../Fetch/Fetch'

import User from '../Users/User'
import { getAllUsers, findUser } from '../Fetch/Requests';

export default class FindUser extends React.Component {
	constructor(){
		super()
		this.state = {
			users: []
		}
	}	

	componentDidMount() {
		this.getAll()
	}


	getAll = () => {
		getAllUsers(response => {
			if (response !== false) {
				this.setState({
					users:this.state.users.concat( response.user )
				})
			} else {
				alert('cannot connect with server')
			}
		})
	}

	show = (username) => {
		if(username == "") {
			this.getAll()
		} else {
			this.setState({ users:[] })
			findUser(username, response => {
				if (response !== false) {
					this.setState({
						users:this.state.users.concat( response.user )
					})
				} else {
					alert('cannot connect with server')
				}
			})
		}	
	}

	getProfile = (id) => {
		this.props.navigation.navigate('User', id)
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
						onClearText={() => this.getAll()}
						placeholder='Type Here...' />

					<ScrollView>
							<List>
								{this.state.users.map((user) => {
									return(
									<User user={user} key={user.id} getProfile={() => this.getProfile(user.id)}/>)
								})}
							</List>
					</ScrollView>

				</View>
			</Error>
		);
	}
}