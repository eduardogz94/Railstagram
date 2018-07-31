import React, { Component } from 'react'
import { Button, Container, Icon, Content, Form, Item, Input, Label, View } from 'native-base';
import ActionCable from 'react-native-actioncable'
import { ScrollView, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import myIp from '../Extra/MyIp'

import Auth from '../Auth/Auth'

const auth = new Auth()

export default class Chat extends Component {
    state = {
        history: [],
        message: '',
        user_id: '',
        room_id: ''
    }
    
        componentDidMount = async () => {
            this.initSocket()
            const user_id = await auth.getItem('session')
            // const room_id = this.navigation
            this.setState({ user_id })
        }
        
        initSocket = () => {
            let cable = ActionCable.createConsumer(`ws://172.20.10.3:4000/cable?client=5&room_id=1`)
            this.chats = cable.subscriptions.create({channel: 'ChatChannel', room_id: 1}, {
                connected(data) {

                },
                received(data) {
                    alert('Incoming message: ' + JSON.stringify(data))
                    this.setState({ history: this.state.history.concat ( {msg:data.content} )})
                },
                send_message: function(content) {
                     this.perform('send_message', {
                        content
                    });
                }
            })
        }

        sendMessage = (message) => {
            this.chats.send_message(message)
        }



        
    render() {
        const { message, history } = this.state
        return (
        <View>
            <Label> {this.props.navigation.state.params.username} </Label>
            

                {/* <Input
                    onChangeText={message => this.setState({ message })}
                    autoCapitalize={'none'} />
                <TouchableOpacity 
                    activeOpacity = { 0.2 } 
                    onPress={() => this.sendMessage(message)}>
                        <Text>Comment Now!</Text>
                </TouchableOpacity> */}

                    <Input  
                        style={{backgroundColor:'white', height: '70%'}}
                        readonly
                    >
                    {history.map((msgs, i) => {
                        return (
                            <Label key={i}>
                                {msgs.msg}
                            </Label>
                        )
                    })}
                    </Input>

                <Item  
                style={{backgroundColor:'white', width:'100%', height:'30%'}}
                    rounded>
                    <Input
                        style={{color:'black', fontSize:16}}
                        onChangeText={message => this.setState({message})}
                        autoCapitalize={'none'} />
                    <TouchableOpacity activeOpacity = { 0.2 } onPress={() => this.sendMessage(message)}><Text>Send</Text></TouchableOpacity>
                </Item>

        </View>
    )
  }
}
