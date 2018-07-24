import React, { Component } from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import { Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'

import { fetching } from '../Fetch/Fetch'

import Auth from '../Auth/Auth';
const auth = new Auth()

import { profile } from '../../assets/css/profile'

export default class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            index:0,
            owner: false,
            user: {
                id: '',
                username: '',
                picture: {
                    url:''
                },
                created_at:'',
            }
        }
    }
    
    componentWillMount = () => {
        let id;
        if (this.props.navigation.state.params) {
            id = this.props.navigation.state.params
            fetching({}, 'GET', `${myIp}/api/v1/users/${id}`, response => {
                response.status == 200 
                    ? this.setState({user:response.user, owner: false}) 
                    : alert('Error retrieving the profile')
            })
        } else {
            auth.getItem('session').then(data => {
            id = data
                fetching({}, 'GET', `${myIp}/api/v1/users/${id}`, response => {
                    response.status == 200 
                        ? this.setState({user:response.user, owner: true}) 
                        : alert('Error retrieving the profile')
                })
            })
        }
    }

    editProfile = () => {
        this.props.navigation.navigate('Settings')
    }

    renderSection = () => {
        if (this.state.index == 0) {
            return( <View><Text>This is all the photos</Text></View>)
        }
    }

    segmentClick = (index) => {
        console.log(index)
        this.setState({index:index})
    }

    render() {
        const { username, created_at, picture} = this.state.user;
        return (
        <Error>   
            <ScrollView style={profile.container}>
                <View style={profile.profileTab}>
                    <View style={profile.data}>
                        <Image source={require('../../assets/images/index.jpeg')}
                                style={profile.image}
                        />
                    </View>
                    <View style={{flex:3}}>
                        <View style={profile.dashboard}>
                           <View style={{alignItems:'center'}}>
                                <Text>20</Text>
                                <Text style={{fontSize:10, color:'gray'}}>posts</Text>
                           </View>
                           <View style={{alignItems:'center'}}>
                                <Text>700</Text>
                                <Text style={{fontSize:10, color:'gray'}}>Followers</Text>
                           </View>
                           <View style={{alignItems:'center'}}>
                                <Text>765</Text>
                                <Text style={{fontSize:10, color:'gray'}}>Following</Text>
                           </View> 
                        </View>
                    </View>
                </View>


                <View style={profile.rows}>
                    <Button style={profile.edit} 
                        title={'Edit Profile'}/>
                </View>

                <View style={profile.dataText}>
                    <Text style={profile.username}>Profile</Text>
                    <Text>Testing with the data provided</Text>
                    <Text>WASSUP MATE!</Text>
                </View>

                <View style={profile.tabs}>
                    <Ionicons 
                        style={[this.state.index == 1 ? {color:'purple'} : {}]}
                        size={25} 
                        name={'ios-apps'}
                        onPress={() => this.segmentClick(1)}
                        active={this.state.index == 1}
                         />
                    <Ionicons 
                        style={[this.state.index == 2 ? {color:'purple'} : {}]}
                        size={25} 
                        name={'ios-apps'}
                        onPress={() => this.segmentClick(2)}
                        active={this.state.index == 2}
                         />
                </View>

                {this.renderSection}

            </ScrollView>
        </Error>
        )
    }
}
{/* <Card
    style={profile.card}  
    title={username}
    image = {(picture.url != null) ? {uri:`${myIp}/${picture.url}`} : null}
    >
                       
    <Text style={profile.text}>
        {created_at}
    </Text>

    {this.state.owner 
        ? <Button 
                style={profile.edit}
                onPress={this.editProfile}
                title = 'Edit Profile'/> 
        : console.log('cant edit')}
</Card> */}