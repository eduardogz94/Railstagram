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

	componentDidMount() {
		this.getAll()
	}


	getAll = () => {
		fetching({}, 'GET', `http://${myIp}/api/v1/users`, response => {
			this.setState({ users:[] })
			if (response.status == 200 ) {
				this.setState({
					users:this.state.users.concat( response.user )
				})
			} else {
				alert('cannot connect with server')
			}
		})
	}

	show = (username) => {
		if (username == '') {
			this.getAll()
		} else {

			this.setState({ users:[] })
			fetching({}, 'GET', `${myIp}/api/v1/users/find/${username}`, response => {
				if (response.status == 200 ) {
					this.setState({
						users:this.state.users.concat( response.user )
					})
				} else {
					alert('cannot connect with server')
				}
			})
		}	
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
									<User user={user} key={user.id}/>)
								})}
							</List>
					</ScrollView>

				</View>
			</Error>
		);
	}
}