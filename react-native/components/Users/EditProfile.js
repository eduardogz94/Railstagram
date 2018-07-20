import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { Button } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'
import { fetching } from '../Extra/Fetch'
import Title from '../Extra/HomeTitle'

import UserInputs from './Inputs'
import { inputs } from '../../assets/css/styles'

export default class EditProfile extends Component {
    constructor() {
    super()
        this.state = {
            username: '',
            password: ''
        }
    }

    editProfile = () => {
        if((this.state.password || this.state.username) !== '') {
            const options = {
                username: this.state.username,
                password: this.state.password
            }

            fetching(options, 'PATCH', `${myIp}/api/v1/edit/${id}`, response => {
                response.status == 200 ?
                    this.setState({username:response.user.username})
                    : console.log('There was an error with your request')
            })
        }
    }
    

    render() {
    return (
        <Error>
            <ScrollView style={inputs.inputWrapper}>
                <Title tagline='Login Form'/>
                    <UserInputs 
                        label='Username'
                        onChangeText={username => this.setState({username:username})}
                        placeholder = 'Username'
                        autoCapitalize={'none'}/>
                
                    <UserInputs 
                        label='Password'
                        onChangeText={password => this.setState({password:password})}
                        placeholder = 'Password'
                        secureTextEntry={true}
                        autoCapitalize={'none'}/>
                
                    <Button style={{marginTop: 50}}
                        onPress={this.editProfile}
                        title = 'Log in'/>
            </ScrollView>
        </Error>
    )}
}