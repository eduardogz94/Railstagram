import React from 'react';
import { ScrollView, View } from 'react-native';
import { Card } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Error from './Extra/ErrorBoundary'
import { myIp } from './Extra/MyIp'

import { fetching } from './Fetch/Fetch'

import { home } from '../assets/css/home'

export default class Home extends React.Component {
  static navigationOptions =  {
    headerLeft: (
      <Ionicons style={home.upload} 
        name="ios-camera-outline" 
        size={31} 
        color={'purple'} 
        onPress={() => this.props.navigation.navigate('UPload')}></Ionicons>
    ),
    headerRight: (
      <Ionicons style={home.chat} 
        name='ios-chatbubbles-outline' 
        size={31} 
        color={'purple'} 
        onPress={() => alert('pressed')}/>
      ),
  }

  constructor() {
    super()
    this.state = {
      posts: []
    }
  }
  
  componentDidMount() {
    fetching({}, 'GET', `${myIp}/api/v1/users/all/posts`, response => {
      if (response.status == 200) {
        arr = []
        for (var i in response.posts) {
          arr.push({ image:response.posts[i].post_image.url, user:response.users[i]})
        }
        this.setState({ posts: this.state.posts.concat( arr ) })
      } else {
        alert('error')
      }
    })
  }
  
  render() {
    return (
    <Error>  
      <ScrollView style={home.container}>
        {this.state.posts.map((post, i) => {
          return(
            <Card 
                key={i}  
                title={`${post.user}`}
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
                onPress={() => this.props.navigation.navigate('Upload')}></Ionicons>
              
              <Ionicons 
                style={home.profile} 
                name="ios-share-alt" 
                size={20} 
                color={'purple'} 
                onPress={() => this.props.navigation.navigate('Upload')}></Ionicons>
            
            </View>
            </Card>    
          )})}
      </ScrollView>
    </Error>
    );
  }
}

