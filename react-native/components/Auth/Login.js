import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button, Container, Icon, Content, Form, Item, Input, Label } from 'native-base';
import { FormValidationMessage } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'

import { formStyle } from '../../assets/css/form'

import Logo from '../Extra/Logo';

import Auth, { UserContext } from '../Auth/Auth';

export default class LoginForm extends Component {
    state = {
        email: "",
        password: ""
    }    


    render() {
        const { email, password } = this.state
        return (
        <Error>
            <ScrollView style={formStyle.main}>
                <Container>
                    <Content>
                        <View style={formStyle.background}>
                            <Logo/>
                        </View>                        
                        <Form>
                            
                            <Item floatingLabel>
                                <Icon active style={formStyle.buttons} name='ios-person'/>
                                <Label style={formStyle.labels}>Email</Label>
                                <Input
                                    style={formStyle.inputs} 
                                    onChangeText={email => this.setState({email})}
                                    autoCapitalize={'none'} />
                            </Item>
                            <FormValidationMessage>{this.state.email_error}</FormValidationMessage>      
                            
                            <Item floatingLabel>
                                <Icon active style={formStyle.buttons} name='key'/>  
                                <Label style={formStyle.labels}>Password</Label>
                                <Input
                                    style={formStyle.inputs} 
                                    onChangeText={password => this.setState({password})}
                                    secureTextEntry={true} 
                                    autoCapitalize={'none'} />
                            </Item>
                            <FormValidationMessage>{this.state.passwords_error}</FormValidationMessage>
                            <UserContext.Consumer>
                                {({setSession}) => (
                                    <Button 
                                        block bordered dark
                                        style={formStyle.buttonContainer}
                                        onPress={() => {setSession(email, password)}}>
                                        <Text style={formStyle.loginButtonText}>LOGIN!</Text>
                                        <Icon style={formStyle.icons} name="ios-log-in"></Icon>
                                    </Button>
                                )}
                            </UserContext.Consumer>
                        
                        </Form>
                    </Content>
                </Container>
            </ScrollView>
        </Error>
        )
    }
}
