import React, { Component } from 'react'
import { ScrollView, Image, Text } from 'react-native'
import { Button, Container, Icon, Content, Form, Item, Input, Label } from 'native-base';
import { ImagePicker, Permissions } from 'expo'

import Error from '../Extra/ErrorBoundary'

import { newPost } from '../Fetch/Requests';

import { formStyle } from '../../assets/css/form'

import Auth from '../Auth/Auth';
const auth = new Auth()

export default class Upload extends Component {

    state = {
        description_error: '',
        description: '',
        post_image: '',
        show: '',
        type: '',
        user_id: ''
    }

    componentDidMount() {
        auth.getItem('session').then(user_id => {
            this.setState({ user_id })
        })
    }

    pickImage = async () => {
        const status =  Permissions.askAsync(Permissions.CAMERA_ROLL).then(async data => {
            console.log(data)
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                base64: true
            });
        
            
            if (!result.cancelled) {
                const type = result.uri.substr(result.uri.indexOf('.')+1)
                type = (type == 'jpg') ? 'jpeg' : type 
                this.setState({ post_image:result.base64, show:result.uri, type });
            }
        }).catch(err => {
            console.log(err)
        })
    }

    uploadPost = () => {
        var { post_image, description, type } = this.state
        const id = this.state.user_id
        
        description = (description == "") ? null : description 

        body = { post_image, type, description }

        newPost(body, id, response => {
            if (result.status !== false) {
                this.props.navigation.navigate('Home')
            } else {
                console.log('Error')
            }
        })
    }

    render() {
      let { post_image, show } = this.state;
        return (
            <Error>
                <Container>
                    <ScrollView >
                        <Form>
                            <Item>
                                <Icon active style={formStyle.buttons} name='ios-person'/>
                                <Input 
                                    placeholder='Caption'
                                    onChangeText={description => this.setState({ description })}
                                    autoCapitalize={'none'}/>
                            </Item>
                        
                            <Button bordered dark block
                                style={formStyle.buttonContainer}
                                onPress={this.pickImage}>
                                <Text>Pick an image from camerall roll</Text>
                                <Icon style={formStyle.buttons} name="ios-camera"></Icon>
                            </Button>
                            
                            {post_image &&
                                <Image source={{ uri: show }} style={formStyle.image} />}
        
                            <Button bordered dark block
                                style={formStyle.buttonContainer}
                                onPress={this.uploadPost}>
                                <Text>New Post!</Text>
                                <Icon style={formStyle.buttons} name="ios-log-in"></Icon>
                            </Button>
                        </Form>
                    </ScrollView>
                </Container>
                
            </Error>
        )
    }
}
