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

var images = [
    require('../../assets/images/index.jpeg'),
    require('../../assets/images/index.jpeg'),
    require('../../assets/images/index.jpeg'),
    require('../../assets/images/index.jpeg')
]

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

    renderSection = () => {
        if (this.state.index == 0) {
            return( <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                        {this.sectionOne()}
                    </View>)
        } else if (this.state.index == 1) {
            return ( <View>

                    </View>
            )
        }
    }

    sectionOne = () => {
        return  images.map((image,index) => {
            return ( 
                    <View key={index} 
                    style={[profile.images,
                        index % 3 !==0 ? {paddingLeft:2} : {paddingLeft:0}    
                    ]}>
                    
                    <Image style={profile.imageIndex}
                        source={image}
                    />
                </View>
            )
        })
    }

    segmentClick = (index) => {
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
                                style={profile.image}/>
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
                        title={'Edit Profile'}
                        onPress={() => this.props.navigation.navigate('Settings')}
                        />
                </View>

                <View style={profile.dataText}>
                    <Text style={profile.username}>{username}</Text>
                    <Text>{created_at}</Text>
                    <Text>WASSUP MATE!</Text>
                </View>

                <View style={profile.tabs}>
                    <Ionicons 
                        style={[this.state.index == 0 ? {color:'purple'} : {}]}
                        size={25} 
                        name={'ios-apps'}
                        onPress={() => this.segmentClick(0)}
                        active={this.state.index == 0}
                         />
                    <Ionicons 
                        style={[this.state.index == 1 ? {color:'purple'} : {}]}
                        size={25} 
                        name={'ios-apps'}
                        onPress={() => this.segmentClick(1)}
                        active={this.state.index == 1}
                         />
                </View>

                {this.renderSection()}

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