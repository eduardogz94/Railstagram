import React, { Component } from 'react'
import { ScrollView, Text, Image } from 'react-native'
import { Card, Button } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'

import { fetching } from '../Fetch/Fetch'

import Auth from '../Auth/Auth';
const auth = new Auth()

import { profile } from '../../assets/css/profile'

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            owner: false,
            user: {
                id: '',
                username: '',
                picture: {
                    url:''
                },
                created_at:'',
            }
        }
    }
    
    componentWillMount = () => {
        let id;
        if (this.props.navigation.state.params) {
            id = this.props.navigation.state.params
            fetching({}, 'GET', `${myIp}/api/v1/users/${id}`, response => {
                response.status == 200 
                    ? this.setState({user:response.user, owner: false}) 
                    : alert('Error retrieving the profile')
            })
        } else {
            auth.getItem('session').then(data => {
            id = data
                fetching({}, 'GET', `${myIp}/api/v1/users/${id}`, response => {
                    response.status == 200 
                        ? this.setState({user:response.user, owner: true}) 
                        : alert('Error retrieving the profile')
                })
            })
        }
    }

    edit = () => {
        console.log('pressed')
        this.props.navigation.navigate('Settings')
    }

    render() {
        const { username, created_at, picture} = this.state.user;
        return (
        <Error>   
            <ScrollView style={profile.container}>
                <Card
                    style={profile.card}  
                    title={username}
                    image = {(picture.url != null) ? {uri:`${myIp}/${picture.url}`} : null}
                    
                    >
                                       
                    <Text style={profile.text}>
                        {created_at}
                    </Text>

                    {this.state.owner 
                        ? <Button 
                                style={profile.edit}
                                onPress={this.edit}
                                title = 'Edit Profile'/> 
                        : console.log('cant edit')}
                </Card>

            </ScrollView>
        </Error>
        )
    }
}