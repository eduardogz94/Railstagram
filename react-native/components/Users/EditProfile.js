import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { Button, Container, Icon, Content, Form, Item, Input, Label } from 'native-base';
import { FormValidationMessage } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'

import { editProfile } from '../Fetch/Requests';

import { formStyle } from '../../assets/css/login'

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
            
            editProfile(id, options, response => {
                if (response !== false) {
                    this.setState({username:response.user.username, owner: true})
                } else {
                    console.log('There was an error with your request')
                }       
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
            <ScrollView style={formStyle.main}>
                <Container>
                    <Content>
                        <Form>
                            <Item floatingLabel>
                                <Icon active style={formStyle.buttons} name='ios-person'/>
                                <Label>Username</Label>
                                <Input 
                                    onChangeText={username => this.setState({username:username})}
                                    autoCapitalize={'none'} />
                            </Item>
                            <FormValidationMessage>{this.state.username_error}</FormValidationMessage>      
                            
                            <Item floatingLabel>
                                <Icon active style={formStyle.buttons} name='key'/>  
                                <Label>Password</Label>
                                <Input 
                                    onChangeText={password => this.setState({password:password})}
                                    secureTextEntry={true} 
                                    autoCapitalize={'none'} />
                            </Item>
                            <FormValidationMessage>{this.state.passwords_error}</FormValidationMessage>
                            
                            <Button 
                                block bordered dark
                                style={formStyle.buttonContainer}
                                onPress={this.editProfile}>
                                <Text>Edit Profile</Text>
                                <Icon style={formStyle.buttons} name="ios-log-in"></Icon>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </ScrollView>
        </Error>
    )}
}