import React, { Component } from 'react'
import { Button, Container, Icon, Content, Form, Item, Input, Label, View } from 'native-base';
import ActionCable from 'react-native-actioncable'
import { ScrollView, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import myIp from '../Extra/MyIp'

import Auth from '../Auth/Auth'
import MsgBox from './MsgBox';
import ChatTitle from './ChatTitle';
import Messages from './Messages';
import { checkConv, historyConv, createConv } from '../Fetch/Requests';

const auth = new Auth()

export default class Chat extends Component {
    state = {
        history: [],
        room_id: ''
    }
    
    componentDidMount = async () => {
        this.initSocket()
        const sender_id = await auth.getItem('session')
        const receiver_id = this.props.navigation.state.params.user.id 
        checkConv({sender_id, receiver_id}, room_id => {
            if (room_id != null) {
                this.setState({ room_id })
                this.connectToChannel(room_id, false)
            }
        })
    }
    
    initSocket = async () => {
        const user_id = await auth.getItem('session')
        this.cable = ActionCable.createConsumer(`ws://172.20.10.4:4000/cable?client=${user_id}`)
    }

    connectToChannel = (room_id, first_time) => {
        this.setState({ room_id })
        this.chats = this.cable.subscriptions.create({channel: 'ChatChannel', room_id }, {
            connected: (data) => {
                if (first_time == false) {
                    historyConv({room_id}, response => {
                        this.setState({ history:this.state.history.concat( response.history )})
                    })
                }
            },
            received: (data) => {
                let { history } = this.state
                history.push({ msg:data.content, id:data.user_id })
                this.setState({ history })
            },
            send_message: async function(content) {
                const user_id = await auth.getItem('session')
                this.perform('send_message', {
                    content,
                    user_id,
                    room_id
                })
            }
        })
    }

    sendMessage = async (message) => {
        if (this.state.room_id == '') {
            const sender_id = await auth.getItem('session')
            const receiver_id = this.props.navigation.state.params.user.id 
            createConv({ sender_id, receiver_id}, async room_id => {
                this.connectToChannel(room_id, true)
                this.setState({ room_id })
                await this.chats.send_message(message)
            })
        } else {
            this.chats.send_message(message)
        }
    }
        
    render() {
        const { history } = this.state
        const { username, id } = this.props.navigation.state.params.user 
        return (
        <View>
            <ChatTitle username={username}/> 
            <Messages history={history}/>
            <MsgBox sendMessage={this.sendMessage} receiver={id}/>
        </View>
    )
  }
}
