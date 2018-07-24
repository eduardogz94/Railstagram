import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Error from './Extra/ErrorBoundary'
import { myIp } from './Extra/MyIp'

import Post from './Post/Post'

import { getPosts } from './Fetch/Requests'

import { home } from '../assets/css/home'

export default class Home extends React.Component {
  static navigationOptions =  {
    headerLeft: (
      <Ionicons style={home.upload} 
        name="ios-camera-outline" 
        size={31} 
        color={'purple'} 
        onPress={() => this.props.navigation.navigate('Photo')}
        />
    ),
    headerRight: (
      <Ionicons style={home.chat} 
        name='ios-send-outline' 
        size={31} 
        color={'purple'} 
        onPress={() => alert('pressed')}
        />
      ),
  }

  constructor() {
    super()
    this.state = {
      posts: []
    }
  }
  
  componentDidMount() {
    getPosts(response => {
      if (response) {
        arr = []
        for (var i in response) {
          arr.push({ image:response[i].image, 
            user:{
              username: response[i].user[0].username,
              id: response[i].user[0].id
            }
          })
        }
        this.setState({ posts: this.state.posts.concat(arr)})
      } else {
        console.log('error')
      }
    })
  }
  
  render() {
    return (
      <Error>  
      <ScrollView style={home.container}>
        {this.state.posts.map((post, i) => {
          return(
            <Post key={i} user={post.user} imageSource={2} likes={105}></Post>  
          )})}
      </ScrollView>
    </Error>
    );
  }
}

{/* <Card 
    key={i}  
    title={`${post.user.username}`}
    image = {(post.image != null) ? {uri:`${myIp}${post.image}`} : null}>

  <View style={home.buttons}>
  
    <Ionicons 
      style={home.like}
      name="ios-heart-outline" 
      size={20} 
      color={'purple'} 
      onPress={() => this.props.navigation.navigate('Upload')}></Ionicons>

    <Ionicons 
      style={home.comment} 
      name="ios-chatboxes-outline" 
      size={20} 
      color={'purple'} 
      onPress={() => this.checkId(post.user.id)}></Ionicons>
    
    <Ionicons 
      style={home.profile} 
      name="ios-share-alt" 
      size={20} 
      color={'purple'} 
      onPress={() => this.props.navigation.navigate('User', post.user.id)}></Ionicons>
  
  </View>

</Card> */}