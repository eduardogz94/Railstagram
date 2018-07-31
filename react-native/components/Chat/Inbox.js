import React, { Component } from 'react'
import { Button, Container, Icon, Content, Form, Item, Input, Label, View } from 'native-base';
import ActionCable from 'react-native-actioncable'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import { List, SearchBar, ListItem } from 'react-native-elements'
import myIp from '../Extra/MyIp'
import { getAllUsers } from '../Fetch/Requests';
import User from '../Users/User'

export default class Inbox extends Component {
    state = {
        users: []
    }
    
    componentDidMount() {
        getAllUsers(response => {
            if (response !== false) {
                this.setState({
                    users:this.state.users.concat( response.user )
                })
            } else {
                console.log('cannot connect with server')
            }
        })
    }

    render() {
        const { message } = this.state
        return (
            <View>
                <Label> Direct Messages </Label>
                <ScrollView>
							<List>
								{this.state.users.map((user) => {
									return(
                                        <ListItem
                                            roundAvatar
                                            key={user.id}
                                            avatar = {(user.picture.url != null) ? `${myIp}/${user.picture.url}` : null}
                                            title={user.username}
                                            subtitle={'username'}
                                            onPress={() => this.props.navigation.navigate('Chat', {username:user.username})}
                                            />
                                    )}
                                )}
							</List>
					</ScrollView>

            </View>
        )
    }
}
