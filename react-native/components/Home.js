import React from 'react';
import { ScrollView } from 'react-native';
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
        onPress={() => console.log('pressed')}
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
                    const { image, description, like, comment, user } = response[i]
                    arr.push({ 
                        image, 
                        description,
                        like,
                        comment,
                        user:{
                            username: user.username,
                            id: user.id,
                            avatar: user.avatar
                        }
                    })
                }
                this.setState({ posts: this.state.posts.concat(arr)})
            } else {
                console.log('error')
            }
        })
    }

    goToProfile = (id) => {
        this.props.navigation.navigate('User', id)
    }
  
    render() {
    
        return (
        <Error>  
        <ScrollView style={home.container}>
            {this.state.posts.map((post, i) => {
            return(
                <Post key={i} 
                      user={post.user} 
                      goToProfile={this.goToProfile} 
                      description={post.description} 
                      img={{uri:`${myIp}/`+post.image}} 
                      imageSource={2} 
                      likes={105}></Post>  
            )})}
        </ScrollView>
        </Error>
        );
    }
}