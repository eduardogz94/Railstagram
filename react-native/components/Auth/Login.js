import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { Button, Container, Icon, Content, Form, Item, Input, Label } from 'native-base';
import { FormValidationMessage } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'

import { login } from '../Fetch/Requests'

import { formStyle } from '../../assets/css/form'

import Auth from '../Auth/Auth';
const auth = new Auth()

export default class LoginForm extends Component {

    constructor(){
        super()  

        this.state = {
            passwords_error: '',
            username_error: '',
            username: '',
            password: ''
        }
    }

    logIn = (event) => {
        event.preventDefault()
        const { username, password } = this.state;
        this.setErrors()
        
        if (this.checkInputs()) {
            const options = { 
                username: username,
                password: password
            }
            
            login(options, response => {
                if (response !== false) {
                    auth.setItem('session',JSON.stringify(response))
                    this.props.navigation.navigate('Home')
                } else {
                    this.setState({username_error: 'Username doesnt exist'}) ;
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
                                onPress={this.logIn}>
                                <Text>Login!</Text>
                                <Icon style={formStyle.buttons} name="ios-log-in"></Icon>
                            </Button>

                            <Text>Havent signup yet?</Text>
                        </Form>
                    </Content>
                </Container>
            </ScrollView>
        </Error>
        )
    }
}
