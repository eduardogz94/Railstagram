import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Card, CardItem, Thumbnail, Body, Left, Button, Right, Icon} from 'native-base'

import { myIp } from '../Extra/MyIp'

import { post } from '../../assets/css/post'


export default class Post extends Component {
    state = {

    }

    componentDidMount = () => {
      if (this.props.user.avatar) {
          this.setState({avatar:this.props.user.avatar})
      } else (
          this.setState({avatar:this.props.user.picture.url})
      )
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
                        <Text style={post.username}>{this.props.user.username}</Text>
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
                    <Text style={post.username}>{this.props.user.username}</Text>
                        {this.props.description}
                     </Text>
            </CardItem>

        </Card>
      </View>
    )
  }
}