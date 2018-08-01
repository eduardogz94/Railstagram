import React from "react";
import { View, Label } from "native-base";

class ChatTitle extends React.Component {
    render() {
        return (
        <View style={{backgroundColor: 'purple'}} >
            <Label style={{color:'white'}}>Chat with {this.props.username}</Label>
        </View>
        )
	}
}

export default ChatTitle;
