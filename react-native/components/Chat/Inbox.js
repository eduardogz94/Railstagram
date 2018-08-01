import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { Label, View } from 'native-base';
import { List, ListItem } from 'react-native-elements'

import myIp from '../Extra/MyIp'

import { getAllUsers } from '../Fetch/Requests';

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
                                        avatar = {(user.picture.url != null) ? `${myIp}${user.picture.url}` : null}
                                        title={user.username}
                                        subtitle={'username'}
                                        onPress={() => this.props.navigation.navigate('Chat', { user })}
                                    />
                                )}
                            )}
                        </List>
                </ScrollView>
            </View>
        )
    }
}
