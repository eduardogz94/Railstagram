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
            user: []
            }
    }
    
    
    componentDidMount = () => {
        alert('mounting profile')
        auth.getItem('session').then(data => {
            fetching({}, 'GET', `${myIp}/api/v1/users/find/${data}`, response => {
                console.log(response)
                response.status == 200 
                    ? this.setState({user:this.state.user.concat( response.use )}) 
                    : alert('Error retrieving the profile')
            })
        })    
    }
  
    render() {
        alert(JSON.stringify(this.state.user))
        const { id, username, created_at, picture} = this.state.user;
        return (
        <Error>    
            <View>
                <Card  
                    title={username}
                    >
                    <Image source={(picture.url != null) ? `${myIp}/${picture.url}` : null}/>
                    <Text style={{marginBottom: 10}}>
                        {created_at}
                    </Text>
                </Card>
            </View>
        </Error>
        )
    }
}