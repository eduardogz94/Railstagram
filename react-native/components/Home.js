import React from 'react';
import { ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';

import {UserStack} from './Routes'

import Error from './Extra/ErrorBoundary'
import { myIp } from './Extra/MyIp'
import { fetching } from './Extra/Fetch'

import User from './Users/User'

export default class Home extends React.Component {
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
                image = {(post.image != null) ? {uri:`${myIp}${post.image}`} : null}
                onPress={() => this.props.navigation.navigate('Profile')}>
            </Card>
          )})}
      </ScrollView>
    </Error>
    );
  }
}

