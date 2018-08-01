import React, { Component } from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import { Button } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons';

import Error from '../Extra/ErrorBoundary'
import { myIp } from '../Extra/MyIp'

import { userDetails, getFollowers, getFollowing, follow, checkFollow, unfollow } from '../Fetch/Requests'

import { profile } from '../../assets/css/profile'

import Post from '../Post/Post';

import { getDate } from '../Extra/Utilities'

import Auth, { UserContext } from '../Auth/Auth';
const auth = new Auth()


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
            posts: [],
            followers: [],
            following: [],
            follows: false
        }
    }
    
    componentDidMount = async () => {
        let id;
        
        if (this.props.navigation.state.params) {
            id = this.props.navigation.state.params
            userDetails(id, response => {
                response !== false
                    ? this.setState({user:response.user, posts:response.posts, owner: false}) 
                    : console.log('Error retrieving the profile')
                })

            this.checkFollows(id)
                
            this.getFollow(id)

        } else {
            let data = await auth.getItem('session')
            id = data

            userDetails(id, response => {
                response !== false 
                    ? this.setState({user:response.user, posts:response.posts, owner: true}) 
                    : console.log('Error retrieving the profile')
            })

            this.getFollow(id)
        }
    }

    checkFollows = async (following) => {
        let follower_id = await auth.getItem('session')

        let follows = {
            followed_id:following,
            follower_id:follower_id,
        }

        checkFollow(follows , response => {
            if (response == true) {
                this.setState({follows:true})
            }
        })
    }

    getFollow = id => {
        getFollowers(id, response => {
            response !== false
                ? this.setState({followers:response.length})
                : console.log('none')
        })

        getFollowing(id, response => {
            response !== false
                ? this.setState({following:response.length})
                : console.log('none')
        })
    }

    follow = async () => {
        const data = await auth.getItem('session')
            
            let options = {
                follower_id: data,
                followed_id: this.props.navigation.state.params
            }

            follow(options, response => {
                response !== false
                    ? this.setState({followers:+this.state.followers + 1, follows:true})
                    : console.log('false')
            })
    }

    unfollow = async () => {
        let data = await auth.getItem('session')
            
        let options = {
            follower_id: data,
            followed_id: this.props.navigation.state.params
        }

        unfollow(options, response => {
            response !== false 
                ? this.setState({followers: +this.state.followers - 1, follows:false}) 
                : console.log('false')
        })
    }

    goToProfile = (id) => {
        this.props.navigation.navigate('User', id)
    }

    renderSection = () => {
        if (this.state.index == 0) {
            return( <View style={profile.sectionOne}>
                        {this.sectionOne()}
                    </View>)
        } else if (this.state.index == 1) {
                const { posts } = this.state
                console.log(posts)
                return  posts.map((post,index) => {
                    return ( 
                        <Post 
                            key={index} 
                            user={this.state.user}
                            img={{uri:`${myIp}/`+post.post_image.url}}
                            likes={post.like}
                            goToProfile={this.goToProfile}
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
        this.setState({ index })
    }

    buttons = () => {
        if (this.state.owner == true) {
            return(<Button style={profile.edit} bordered dark onPress={() => this.props.navigation.navigate('Settings')}>
                        <Text>Edit Profile</Text>
                    </Button>)
        } 
        else if (this.state.follows == false) {
            return(<Button bordered dark style={profile.follow} onPress={() => this.follow()}>
                        <Text>Follow!</Text>
                    </Button>)
        }
        else if (this.state.follows == true) {
            return(<Button bordered dark style={profile.unfollow} onPress={() => this.unfollow()}>
                        <Text style={profile.unfollowText}>Unfollow!</Text>
                    </Button>)
        } 
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
                           
                           <View style={profile.stats}>
                                <Text>{this.state.posts.length}</Text>
                                <Text style={profile.userData}>posts</Text>
                           </View>

                           <View style={profile.stats}>
                                <Text>{this.state.followers}</Text>
                                <Text style={profile.userData}>Followers</Text>
                           </View>
                           
                           <View style={profile.stats}>
                                <Text>{this.state.following}</Text>
                                <Text style={profile.userData}>Following</Text>
                           </View> 
                        </View>
                    </View>
                </View>


                <View style={profile.rows}>
                    {this.buttons()}

                    {this.state.owner 
                        ? <UserContext>
                            {({token, setSession, removeSession}) => (
                                <Button 
                                    bordered dark 
                                    style={profile.logout} 
                                    onPress={() => removeSession()}>
                                    <Text>Logout</Text>
                                </Button>
                            )}
                        </UserContext>
                        : 
                        this.state.owner
                    }
                </View>

                <View style={profile.dataText}>
                    <Text style={profile.username}>{username}</Text>
                    {getDate(created_at)}
                    <Text>WASSUP MATE!</Text>
                </View>

                <View style={profile.tabs}>
                    <View>
                        <Ionicons 
                            style={[this.state.index == 0 ? {color:'purple'} : {}]}
                            size={40} 
                            name={'ios-apps'}
                            onPress={() => this.segmentClick(0)}
                            active={this.state.index == 0}
                        />
                        
                    </View>
                    
                    <View>
                        <Ionicons 
                            style={[this.state.index == 1 ? {color:'purple'} : {}]}
                            size={40} 
                            name={'ios-photos'}
                            onPress={() => this.segmentClick(1)}
                            active={this.state.index == 1}
                        />
                    </View>           
                </View>          

                {this.renderSection()}
            </ScrollView>
        </Error>
        )
    }
}