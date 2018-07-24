import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

import { Card, CardItem, Thumbnail, Body, Left, Button, Right, Icon} from 'native-base'

import { post } from '../../assets/css/post'

var images = {
    '1':require('../../assets/images/index.jpeg'),
    '2':require('../../assets/images/index.jpeg'),
    '3':require('../../assets/images/index.jpeg'),
    '4':require('../../assets/images/index.jpeg')
}

export default class Post extends Component {
    render() {
    return (
      <View>
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail 
                    source={images[this.props.imageSource]}/>
                    <Body>
                        <Text style={post.username}>{this.props.user.username}</Text>
                        <Text note>Jan 15, 2018</Text>
                    </Body>
                    
                </Left>
            </CardItem>

            <CardItem cardBody>
                <Image 
                    style={post.main}
                    source={images[this.props.imageSource]}

                    />
            </CardItem>

            <CardItem style={post.buttonContainer}>
                <Left>
                    <Button transparent>
                        <Icon name={'ios-heart-outline'}/>
                    </Button>
                    <Button transparent>
                        <Icon name={'ios-chatbubbles-outline'}/>
                    </Button>
                </Left>
                <Right>
                    <Button transparent>
                        <Icon name={'ios-send-outline'}
                            onPress={() => this.props.navigation.navigate('User', post.user.id)}
                        />
                    </Button>
                </Right>    
            </CardItem>

            <CardItem>
                <Text>{this.props.likes}</Text>
            </CardItem>

            <CardItem>
                <Text>
                    <Text style={post.username}>{this.props.user.username}</Text>
                    lorem s s s s s sglorem s s s s s sglorem s s s s s sglorem s s s s s sg
                    lorem s s s s s sglorem s s s s s sglorem s s s s s sglorem s s s s s sg
                </Text>
            </CardItem>

        </Card>
      </View>
    )
  }
}