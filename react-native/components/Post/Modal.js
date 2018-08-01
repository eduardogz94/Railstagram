import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { ListItem, Button, Icon, Left, Body, Right, List, Input, Item, Label, Footer, Content, Form, Container, Header } from 'native-base'

import { getComments, comment } from '../Fetch/Requests'

import Comments from './Comments'

import { post } from '../../assets/css/post'

import Auth from '../Auth/Auth';
const auth = new Auth()

export default class CommentModal extends Component {
    state = {
        comments: []
    }

    componentDidMount = () => {
        let id = this.props.navigation.state.params
        this.loadComments(id)
    }
    
    loadComments = id => {
        
        getComments(id, comments => {
              comments.length == 0
                  ? console.log('no comments')
                  : this.setState({comments:comments })
        })
    }
    
    comment = async () => {
        let user_id = await auth.getItem('session')
        let id = this.props.navigation.state.params
        
        let text = {
            text:this.state.comment
        }

        comment(text, user_id, id, response => {
            response !== false 
                ? this.loadComments(id)
                : console.log('error commenting')
        })
    }

  render() {
    return (
        <Container style={post.commentsModal}>
            <Header style={{backgroundColor: 'purple'}}>
                <Text style={{color:'white', fontSize:17}}> Comments </Text> 
            </Header>
            
            <Content >    
                    <List>
                        {this.state.comments.map((comment, index) => {
                            return (<Comments key={index} comment={comment}/>)})}
                    </List>
            </Content>
            <Footer>
                <Item  
                    style={{backgroundColor:'white', width:'98%'}}
                    rounded>
                    <Label style={{color:'white', marginHorizontal: '8%', fontSize:8}}>Comment</Label>
                    <Input
                        placeholder="Type here..."
                        style={{color:'white', fontSize:10}}
                        onChangeText={comment => this.setState({comment:comment})}
                        autoCapitalize={'none'} />
                    <TouchableOpacity style={{marginVertical: '5%', marginHorizontal:'10%'}} activeOpacity = { 0.2 } onPress={() => this.comment()}>
                        <Text style={{color:'purple'}}>Comment Now!</Text></TouchableOpacity>
                </Item>
            </Footer>
        </Container>
    )
  }

}