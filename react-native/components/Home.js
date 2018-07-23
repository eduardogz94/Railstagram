import React from 'react';
import { ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Error from './Extra/ErrorBoundary'
import { myIp } from './Extra/MyIp'
import { fetching } from './Extra/Fetch'
import { Button } from 'react-native-elements';

export default class Home extends React.Component {
  static navigationOptions = {
    headerLeft: (
      <Ionicons style={{marginLeft: 15}} name="ios-camera" size={31} 
        color={'purple'} onPress={() => this.props.navigation.navigate('Upload')}></Ionicons>
    ),
    headerRight: (
      <Ionicons style={{marginRight: 15}} name='ios-chatbubbles' size={31} 
        color={'purple'} onPress={() => alert('pressed')}/>
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
      <ScrollView>
        {this.state.posts.map((post, i) => {
          return(
            <Card key={i}  
                title={`${post.user}`}
                image = {(post.image != null) ? {uri:`${myIp}${post.image}`} : null}>
            
            <Ionicons style={{marginLeft: 15}} 
                      name="ios-people" size={31} 
                      color={'purple'} 
            onPress={() => this.props.navigation.navigate('Upload')}></Ionicons>
            
            </Card>    
          )})}
      </ScrollView>
    </Error>
    );
  }
}

