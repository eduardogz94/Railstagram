import React, { Component } from 'react'
import { View, Text, Image } from 'react-native'
import { Card } from 'react-native-elements'

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
        auth.getItem('id').then(data => {
            fetching({}, 'GET', `${myIp}/api/v1/users/id/${data}`, response => {
                console.log(response.user)
                response.status == 200 
                    ? this.setState({user:response.user}) 
                    : alert('Error retrieving the profile')
            })
            console.log(this.state.user)
        })    
    }
  
    render() {
        const { id, username, created_at, picture} = this.state.user;
        return (
        <Error>    
            <View>
                <Card  
                    title={username}
                    image = {(picture.url != null) ? {uri:`${myIp}/${picture.url}`} : null}
                    >
                    <Text style={{marginBottom: 10}}>
                        {created_at}
                    </Text>
                </Card>
            </View>
        </Error>
        )
    }
}