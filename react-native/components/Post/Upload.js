import React, { Component } from 'react'
import { ScrollView, Image } from 'react-native'
import { Input } from 'native-base';
import { Button, FormValidationMessage } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo'

import Error from '../Extra/ErrorBoundary'

import { newPost } from '../Fetch/Requests';

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
                console.log(type)
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

        body = {
            post_image, type, description
        }

        newPost(body, id, response => {
            if (result.status !== false) {
                this.props.navigation.navigate('Home')
            } else {
                console.log('Error')
            }
        })
    }

    render() {
      let { image, show } = this.state;
        return (
            <Error>
                <ScrollView >
                        <Input 
                            label='Description'
                            onChangeText={description => this.setState({ description })}
                            placeholder = 'Description'
                            autoCapitalize={'none'}/>
                        <FormValidationMessage>{this.state.description_error}</FormValidationMessage>
                        <Button
                            title="Pick an image from camera roll"
                            onPress={this.pickImage}
                            />
                        {image &&
                        <Image source={{ uri: show }} style={{ width: 200, height: 200 }} />}
    
                        <Button style={{marginTop: 50}}
                            onPress={this.uploadPost}
                            title = 'New post!'/>
                </ScrollView>
                
            </Error>
        )
    }
}
