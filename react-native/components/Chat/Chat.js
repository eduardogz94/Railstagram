import React, { Component } from 'react'
import { View } from 'native-base';
import ActionCable from 'react-native-actioncable'

import MsgBox from './MsgBox';
import ChatTitle from './ChatTitle';
import Messages from './Messages';

import Auth from '../Auth/Auth'
const auth = new Auth()

export default class Chat extends Component {
    state = {
        history: [],
        room_id: ''
    }
    
    componentDidMount = async () => {
        this.initSocket()
    }
    
    initSocket = async () => {
        const user_id = await auth.getItem('session')
        let cable = ActionCable.createConsumer(`ws://172.20.10.4:4000/cable?client=${user_id}`)
        this.chats = cable.subscriptions.create({channel: 'ChatChannel', room_id: 1}, {
            connected(data) {
                
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
                    room_id: 1
                })
            }
        })
    }

    sendMessage = (message) => {
        this.chats.send_message(message)
    }
        
    render() {
        const { history } = this.state
        return (
        <View>
            <ChatTitle username={this.props.navigation.state.params.username}/> 
            <Messages history={history}/>
            <MsgBox sendMessage={this.sendMessage}/>
        </View>
    )
  }
}
