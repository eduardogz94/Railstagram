import React from "react";
import { View, Label } from "native-base";

class ChatTitle extends React.Component {
    render() {
        return (
        <View >
            <Label>{this.props.username}</Label>
        </View>
        )
	}
}

export default ChatTitle;
