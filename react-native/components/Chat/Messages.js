import React from "react";
import { Text, ScrollView, View } from 'react-native'
import { ListItem, Button, Icon, Left, Body, Right} from 'native-base'

import { direct } from '../../assets/css/directs'

import Auth from '../Auth/Auth';
const auth = new Auth()

class Messages extends React.Component {

    state = {
        user_id: '',
        sender: false,
        receiver: true
    }

    componentDidMount = async () => {
        const user_id = await auth.getItem('session')
        this.setState({ user_id })
    }
    
    checkMsg = async (sender, i) => {
        let session = await auth.getItem('session')
        this.setState({user_id: session})
        if (session == sender) {
                this.setState({sender:true})       
        } else {
               this.setState({receiver:true})
        }
    }
    
    render() {
        const { history } = this.props
        console.log(history)
        return (
            <ScrollView> 
                {this.props.history.map((msgs, i) => { 
                   return(
                    <View style={{flexDirection:'row'}} key={i}>
                        <ListItem style={{flex:2}}>
                            {msgs.id == this.state.user_id 
                                ? (<Text style={direct.right}>{msgs.msg}</Text>) 
                                : (<Text style={direct.left}>{msgs.msg}</Text>) }>
                            
                        </ListItem>

                        <ListItem style={{flex:2}}>
                                {msgs.id == this.state.user_id 
                                ? (<Text style={direct.right}>{msgs.date}</Text>) 
                                : (<Text style={direct.left}>{msgs.date}</Text>) }>
                        </ListItem>
                    </View>)}   
                )}
            </ScrollView>
        )
	}
}

export default Messages;
