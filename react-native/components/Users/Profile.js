import React, { Component } from 'react'
import { ScrollView, Text, Image } from 'react-native'
import { Card, Button } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'
import Title from '../Extra/HomeTitle'

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
        console.log(this.props)
            fetching({}, 'GET', `${myIp}/api/v1/users/1`, response => {
                console.log(response.user)
                response.status == 200 
                    ? this.setState({user:response.user}) 
                    : alert('Error retrieving the profile')
            })
            console.log(this.state.user)
    }

    edit = () => {
    }

    render() {
        const { id, username, created_at, picture} = this.state.user;
        return (
        <Error>   
            <Title tagline='Profile'/> 
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