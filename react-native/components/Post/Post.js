import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Card, CardItem, Thumbnail, Body, Left, Button, Right, List } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';

import { myIp } from '../Extra/MyIp'

import { like, getLike, getComments, unlike } from '../Fetch/Requests'

import { post } from '../../assets/css/post'

import Comment from './Comments'

import Auth from '../Auth/Auth';
const auth = new Auth()

export default class Post extends Component {
    state = {
        comments: [],
        liked: false,
        likes: this.props.likes,
        comment: false
    }

    componentDidMount = async () => {
      if (this.props.user.avatar) {
          this.setState({ avatar:this.props.user.avatar })
      } else {
          this.setState({ avatar:this.props.user.picture.url })
      }

      let id = this.props.id

      getComments(id, comments => {
            if (comments !== '') {
                this.setState({ comments })
            }
      })

      const loggedId = await auth.getItem('session')
      getLike(loggedId, this.props.id, liked => {
          if (liked != false) {
              this.setState({ liked: true, like_id: liked })
            }
        })
    }
    
    likePost = async () => {
        const loggedId = await auth.getItem('session')
        like(loggedId, this.props.id, response => {
            if (response != false) {
                this.setState({ 
                    liked: true, 
                    like_id: response,
                    likes: +this.state.likes + 1
                })
            }
        })
    }

    unlikePost = async () => {
        const loggedId = await auth.getItem('session')  
        unlike(loggedId, this.props.id, this.state.like_id, response => {
            if (response) {
                this.setState({
                    liked: false,
                    like_id: '',
                    likes: +this.state.likes - 1
                })
            }
        })
    }

    getComment = () => {
        console.log('clicked comment')
        this.props.navigation.navigate('Comments')
    }
    
    render() {
    return (
      <View>
        <Card>
            <CardItem>
                <Left>
                <TouchableOpacity activeOpacity = { .5 } onPress={() => this.props.goToProfile(this.props.user.id) }>
                    <Thumbnail 
                        source={{uri: `${myIp}/${this.state.avatar}`}}/>
                </TouchableOpacity>
                    <Body>
                        <Text style={post.bold}>{this.props.user.username}</Text>
                        <Text style={post.bold}>Jan 15, 2018</Text>
                    </Body>
                    
                </Left>
            </CardItem>

            <CardItem cardBody>
                <Image 
                    style={post.main}
                    source={this.props.img}
                    />
            </CardItem>

            <CardItem style={post.buttonContainer}>
                <Left>
                    <Button transparent>
                        {this.state.liked == true ?
                             (<Ionicons
                            size={25} 
                            style={post.buttons}
                            name={'ios-heart'}
                            onPress = {() => this.unlikePost()}
                            />)
                            :  (<Ionicons
                            size={25} 
                            style={post.buttons}
                            name={'ios-heart-outline'}
                            onPress={() => this.likePost()}
                            />)}
                    </Button>
                    <Button transparent>
                        <Ionicons
                            size={25} 
                            style={post.buttons}
                            name={'ios-chatbubbles-outline'}
                            onPress={() => this.getComment()} />
                        
                    </Button>
                </Left>
                <Right>
                    <Button transparent>
                        <Ionicons
                            size={25} 
                            style={post.buttons}
                            name={'ios-send-outline'}
                            onPress={() => console.log('a')}
                            />
                    </Button>
                </Right>    
            </CardItem>

            <CardItem>
                <Text style={post.bold}>{this.state.likes} likes</Text>
            </CardItem>

            <CardItem>
                <Text>
                    <Text style={post.bold}>{this.props.user.username}  </Text>
                        {this.props.description}
                     </Text>
            </CardItem>

            <List>
                {this.state.comments !== '' ? 
                    this.state.comments.map((comment,index) => {
                        return(<Comment key={index} comment={comment}/>)
                    }) 
                    : console.log('test')}
            </List>
        </Card>
      </View>
    )
  }
}