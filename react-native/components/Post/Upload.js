import React, { Component } from 'react'

import { ScrollView, Image, View, TouchableOpacity, Text } from 'react-native'
import { Button, FormValidationMessage } from 'react-native-elements'
import { ImagePicker, Permissions, Camera } from 'expo'
import Error from '../Extra/ErrorBoundary'
import UserInputs from '../Users/Inputs'
import { inputs , butons } from '../../assets/css/styles'
import { myIp } from '../Extra/MyIp'
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
                alert('Error')
            }
        })
    }
    // state = {
    //     hasCameraPermission: null,
    //     type: Camera.Constants.Type.back,
    //   };
    
    //   async componentWillMount() {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA);
    //     this.setState({ hasCameraPermission: status === 'granted' });
    //   }
    
    //   takePhoto = async () => {
    //     if (this.camera) {
    //         let photo = await this.camera.takePictureAsync({ base64:true })
    //         base64Img.base64(photo.uri, function(err, data) {
    //             if (err) { return alert(err) }
    //             alert(data)
    //         })
    //         alert(JSON.stringify(photo))
            
    //     }

    // }

    render() {
        // const { hasCameraPermission } = this.state;
        // if (hasCameraPermission === null) {
        //   return <View />;
        // } else if (hasCameraPermission === false) {
        //   return <Text>No access to camera</Text>;
        // } else {
        //   return (
        //     <View style={{ flex: 1 }}>
        //       <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref; }}>
        //         <View
        //           style={{
        //             flex: 1,
        //             backgroundColor: 'transparent',
        //             flexDirection: 'row',
        //           }}>
        //           <TouchableOpacity
        //             style={{
        //               flex: 0.1,
        //               alignSelf: 'flex-end',
        //               alignItems: 'center',
        //             }}
        //             onPress={this.takePhoto}>
        //             <Text
        //               style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
        //               {' '}Flip{' '}
        //             </Text>
        //           </TouchableOpacity>
        //         </View>
        //       </Camera>
        //     </View>
        //   )
        // }
        let { image, show } = this.state;
        return (
            <Error>
                <ScrollView style={inputs.inputWrapper}>
                        <UserInputs 
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
