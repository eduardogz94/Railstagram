import React, { Component } from 'react'
import { ScrollView, Text, Image } from 'react-native'
import { Card, Button } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'

import Auth from '../Auth/Auth';
const auth = new Auth()

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
                    ? this.setState({user:response.user}) 
                    : alert('Error retrieving the profile')
            })
        } else {
            auth.getItem('session').then(data => {
            id = data
                fetching({}, 'GET', `${myIp}/api/v1/users/${id}`, response => {
                    response.status == 200 
                        ? this.setState({user:response.user}) 
                        : alert('Error retrieving the profile')
                })
            })
        }
    }

    edit = () => {
    }

    render() {
        const { username, created_at, picture} = this.state.user;
        return (
        <Error>   
            <ScrollView>
                <Card  
                    title={username}
                    image = {(picture.url != null) ? {uri:`${myIp}/${picture.url}`} : null}
                    >
                    <Text style={{marginBottom: 10}}>
                        {created_at}
                    </Text>

                    <Button style={{marginTop: 50}}
                    onPress={this.edit}
                    title = 'Edit Profile'/>
                </Card>
            </ScrollView>
        </Error>
        )
    }
}