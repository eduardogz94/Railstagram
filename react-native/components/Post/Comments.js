import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { ListItem, Button, Icon, Left, Body, Right} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { getDate } from '../Extra/Utilities'

import { uncomment } from '../Fetch/Requests'

import { post } from '../../assets/css/post'

import Auth from '../Auth/Auth';
const auth = new Auth()


export default class Comments extends Component {
  render() {
      const { username, text, created, id } = this.props.comment
    return (
        <ListItem icon>
            <Left>
                <Text style={post.username}>{username}</Text>
            </Left>
            
            <Body>
                <Text style={post.comments}>{text}</Text>
            </Body>
        
            <Right>
                {getDate(created)}
                
                <Button
                    transparent
                    style={post.deleteComment} 
                    onPress={() => this.props.delete(id)}
                    >
                    <Icon style={{ color:'purple'}} name={'ios-close'}/>
                </Button>
            </Right>
        </ListItem>
        )
  }
}
