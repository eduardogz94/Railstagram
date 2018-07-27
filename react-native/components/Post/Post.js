import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Card, CardItem, Thumbnail, Body, Left, Button, Right, Icon} from 'native-base'

import { myIp } from '../Extra/MyIp'

import { like, getLike, getComments } from '../Fetch/Requests'

import { post } from '../../assets/css/post'


export default class Post extends Component {
    state = {
        comments: []
    }

    componentDidMount = () => {
      if (this.props.user.avatar) {
          this.setState({avatar:this.props.user.avatar})
      } else {
          this.setState({avatar:this.props.user.picture.url})
      }

      let id = this.props.id

      getComments(id, comments => {
            if (comments !== '') {
                this.setState({comments:comments})
            }
      })

      getLike(this.props.user.id, id, liked => {
            if (liked == true) {
                this.setState({liked:true})
            }
      })
    }

    like = () => {

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
                        <Icon 
                            style={post.buttons}
                            name={'ios-heart-outline'}
                            onPress={() => this.like()}
                            />
                    </Button>
                    <Button transparent>
                        <Icon 
                            style={post.buttons}
                            name={'ios-chatbubbles-outline'}/>
                    </Button>
                </Left>
                <Right>
                    <Button transparent>
                        <Icon 
                            style={post.buttons}
                            name={'ios-send-outline'}
                            onPress={() => alert('a')}
                            />
                    </Button>
                </Right>    
            </CardItem>

            <CardItem>
                <Text style={post.bold}>{this.props.likes} likes</Text>
            </CardItem>

            <CardItem>
                <Text>
                    <Text style={post.bold}>{this.props.user.username}  </Text>
                        {this.props.description}
                     </Text>
            </CardItem>

            <CardItem>
                <Text>
                    {this.state.comments}
                </Text>
            </CardItem>

        </Card>
      </View>
    )
  }
}