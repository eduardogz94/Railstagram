import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { myIp } from '../Extra/MyIp'

import { Card, CardItem, Thumbnail, Body, Left, Button, Right, Icon} from 'native-base'

import { post } from '../../assets/css/post'


export default class Post extends Component {
    render() {
    console.log(this.props.user)
    const {username, id } = this.props.user
    return (
      <View>
        <Card>
            <CardItem>
                <Left>
                <TouchableOpacity activeOpacity = { .5 } onPress={() => this.props.goToProfile(id) }>
                    <Thumbnail 
                        source={{uri: `${myIp}/${this.props.avatar}`}
                            
                        }
                    />
                </TouchableOpacity>
                    <Body>
                        <Text style={post.username}>{username}</Text>
                        <Text note>Jan 15, 2018</Text>
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
                            name={'ios-heart-outline'}/>
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
                <Text>{this.props.likes}</Text>
            </CardItem>

            <CardItem>
                <Text>
                    <Text style={post.username}>{username}</Text>
                        {this.props.description}
                     </Text>
            </CardItem>

        </Card>
      </View>
    )
  }
}