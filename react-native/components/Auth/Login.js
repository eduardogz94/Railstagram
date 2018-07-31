import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { Button, Container, Icon, Content, Form, Item, Input, Label } from 'native-base';
import { FormValidationMessage } from 'react-native-elements'

import Error from '../Extra/ErrorBoundary'

import { login } from '../Fetch/Requests'

import { formStyle } from '../../assets/css/form'

import Auth, { UserContext } from '../Auth/Auth';
// const auth = new Auth()

export default class LoginForm extends Component {

    // constructor(){
    //     super()  

    //     this.state = {
    //         passwords_error: '',
    //         email_error: '',
    //         email: '',
    //         password: ''
    //     }
    // }

    state = {
        email: "",
        password: ""
    }    

    // logIn = () => {
        // const { email, password } = this.state;
        // this.setErrors()
        // if (this.checkInputs()) {
        //     const options = { 
        //         email,
        //         password
        //     }
        //     newSession(options, response => {
                // if (response !== false) {
                //     auth.setItem('session',JSON.stringify(response))
                //     this.props.navigation.navigate('Home')
                // } else {
                //     this.setState({email_error: 'email doesnt exist'}) ;
                // }
        //         alert(response)
        //     })
        // }
    // }

    checkInputs = () => {
        const { email, password } = this.state;

        (email !== '' && password !== '')
            ? data = true 
            : data = false

        return data;
    }

    setErrors = () => {
        const { email, password } = this.state

        email == '' ? this.setState({email_error:'Cant be blank'}) 
            : this.setState({email_error: ''})

        password == '' ? this.setState({passwords_error:'Cant be blank'}) 
            : this.setState({passwords_error:''})
    }
      

    render() {
        const { email, password } = this.state
        return (
        <Error>
            <ScrollView style={formStyle.main}>
                <Container>
                    <Content>
                        <Form>

                            <Item floatingLabel>
                                <Icon active style={formStyle.buttons} name='ios-person'/>
                                <Label>Email</Label>
                                <Input 
                                    onChangeText={email => this.setState({email})}
                                    autoCapitalize={'none'} />
                            </Item>
                            <FormValidationMessage>{this.state.email_error}</FormValidationMessage>      
                            
                            <Item floatingLabel>
                                <Icon active style={formStyle.buttons} name='key'/>  
                                <Label>Password</Label>
                                <Input 
                                    onChangeText={password => this.setState({password})}
                                    secureTextEntry={true} 
                                    autoCapitalize={'none'} />
                            </Item>
                            <FormValidationMessage>{this.state.passwords_error}</FormValidationMessage>
                           
                           
                            <UserContext.Consumer>
                                {({token, setSession}) => (
                                    <Button 
                                    block bordered dark
                                    style={formStyle.buttonContainer}
                                    onPress={() => setSession(email, password) }>  
                                    <Text>Login!</Text>
                                    <Icon style={formStyle.buttons} name="ios-log-in"></Icon>
                                    </Button>
                                )}
                            </UserContext.Consumer>
                           
                           
                           
                          

                            <Text>Havent signup yet?</Text>
                        </Form>
                    </Content>
                </Container>
            </ScrollView>
        </Error>
        )
    }
}
