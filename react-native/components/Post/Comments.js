import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'
import { ListItem, Button, Icon, Left, Body, Right} from 'native-base'

import { getDate } from '../Extra/Utilities'

import { uncomment } from '../Fetch/Requests'

import { post } from '../../assets/css/post'

import Auth from '../Auth/Auth';
const auth = new Auth()


export default class Comments extends Component {

    state = {
        equals: false
    }
    
    componentDidMount = () => {
      auth.getItem('session').then(id => {
          let user = this.props.comment.user_id
          if (id == user) {
              this.setState({
                  equals: true
              })
          }
      })
    }
    
    deleteButton = (comment_id) => {
        auth.getItem('session').then(id => {
            let user = this.props.comment.user_id
            if (id == user) {
                this.setState({equals:true})
            }
        })
    }

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
                {this.state.equals == true
                    ? (console.log('they are true'),<Button
                            transparent
                            style={post.deleteComment} 
                            onPress={() => this.props.delete(id)}    >
                            <Icon style={{ color:'purple'}} name={'ios-close'}/>
                        </Button>)
                    : this.state.equals }
            </Right>
        </ListItem>
        )
  }
}
