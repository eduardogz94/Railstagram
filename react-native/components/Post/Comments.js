import React, { Component } from 'react'
import { Text } from 'react-native'
import { ListItem, Button, Icon, Left, Body, Right} from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { post } from '../../assets/css/post'

export default class Comments extends Component {
  render() {
    return (
        <ListItem icon>
            <Left>
                <Text style={post.username}>{this.props.comment.username}</Text>
            </Left>
            
            <Body>
                <Text style={post.comments}>{this.props.comment.text}</Text>
            </Body>
        
            <Right>
                <Text style={post.date}>{this.props.comment.created}</Text>
                <Button
                    transparent
                    style={post.deleteComment} 
                    // onPress={this.comment}
                    >
                    <Icon style={{ color:'purple'}} name={'ios-close'}/>
                </Button>
            </Right>
        
        </ListItem>
    )
  }
}
