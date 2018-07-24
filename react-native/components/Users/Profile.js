import React, { Component } from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import { Button, Tabs, Tab, TabHeading, Icon } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'

import { userDetails } from '../Fetch/Requests'

import Post from '../Post/Post';

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
            },
            posts: []
        }
    }
    
    componentWillMount = () => {
        let id;
        if (this.props.navigation.state.params) {
            id = this.props.navigation.state.params
            userDetails(id, response => {
                if (response !== false) {
                    this.setState({user:response.user, posts:response.posts, owner: false}) 
                } else {
                    console.log('Error retrieving the profile')
                }
            })
        } else {
            auth.getItem('session').then(data => {
                id = data
                userDetails(id, response => {
                    if (response !== false) {
                        this.setState({user:response.user, posts:response.posts, owner: true}) 
                    } else {
                        console.log('Error retrieving the profile')
                    }
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
                const { posts } = this.state
                const { user } = this.state.user
                return  posts.map((post,index) => {
                    return ( 
                            <Post 
                                key={index} 
                                user={user}
                                img={{uri:`${myIp}/`+post.post_image.url}}
                                likes={105}
                                />
                    )
                })
        }
    }

    sectionOne = () => {
        const { posts } = this.state
        return  posts.map((post,index) => {
            return ( 
                    <View key={index} 
                    style={[profile.images,
                        index % 3 !==0 ? {paddingLeft:2} : {paddingLeft:0}    
                    ]}>
                    
                    <Image style={profile.imageIndex}
                        source={{uri: `${myIp}/${post.post_image.url}`}}
                    />
                </View>
            )
        })
    }

    segmentClick = (index) => {
        // console.log('test')
        this.setState({index:index})
    }

    render() {
        const { username, created_at, picture} = this.state.user;
 
        return (
        <Error>   
            <ScrollView style={profile.container}>
                <View style={profile.profileTab}>
                    <View style={profile.data}>
                        <Image source={{uri: `${myIp}/${picture.url}`}}
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
                    {this.state.owner 
                        ? <Button style={profile.edit} bordered dark onPress={() => this.props.navigation.navigate('Settings')}>
                                <Text>Edit Profile</Text>
                            </Button>

                        : <Button bordered dark style={profile.follow}>
                                <Text>Follow!</Text>
                            </Button>
                    }    
                </View>

                <View style={profile.dataText}>
                    <Text style={profile.username}>{username}</Text>
                    <Text>{created_at}</Text>
                    <Text>WASSUP MATE!</Text>
                </View>

                <View style={profile.tabs}>
                    <Tabs>
                        <Tab heading={ 
                            <TabHeading>
                                <Ionicons 
                                    style={[this.state.index == 0 ? {color:'purple'} : {}]}
                                    size={25} 
                                    name={'ios-apps'}
                                    onPress={() => this.segmentClick(0)}
                                    active={this.state.index == 0}
                                    />
                                </TabHeading>}>
                            
                        </Tab>
                        
                        <Tab heading={ 
                            <TabHeading>
                                <Ionicons 
                                    style={[this.state.index == 1 ? {color:'purple'} : {}]}
                                    size={25} 
                                    name={'ios-apps'}
                                    onPress={() => this.segmentClick(1)}
                                    active={this.state.index == 1}
                                        />
                                </TabHeading>}>
                            
                        </Tab>           
                    </Tabs>
                    
                </View>
              
    );
  }
}

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