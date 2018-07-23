import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { Button } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'

import { fetching } from '../Fetch/Fetch'

import UserInputs from './Inputs'
import { inputs } from '../../assets/css/styles'

export default class EditProfile extends Component {
    constructor() {
    super()
        this.state = {
            username: '',
            password: '',
            owner: false
        }
    }

    editProfile = () => {
        event.preventDefault()
        const { username, password } = this.state;
        this.setErrors()
        
        if (this.checkInputs()) {
            const options = { 
                username: username,
                password: password
            }
            
            fetching(options, 'PATCH', `${myIp}/api/v1/edit/${id}`, response => {
                response.status == 200 ?
                    this.setState({username:response.user.username, owner: true})
                    : console.log('There was an error with your request')
            })
        }
    }

    checkInputs = () => {
        const { username, password } = this.state;

        (username !== '' && password !== '')
            ? data = true 
            : data = false

        return data;
    }

    setErrors = () => {
        const { username, password } = this.state

        username == '' ? this.setState({username_error:'Cant be blank'}) 
            : this.setState({username_error: ''})

        password == '' ? this.setState({passwords_error:'Cant be blank'}) 
            : this.setState({passwords_error:''})
    }
    

    render() {
    return (
        <Error>
            <ScrollView style={inputs.inputWrapper}>
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
                        title = 'Edit Profile'/>
            </ScrollView>
        </Error>
    )}
}