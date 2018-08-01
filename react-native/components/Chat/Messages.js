import React from "react";
import Sender from "./Sender";
import { View, Label, Text } from "native-base";
import { AsyncStorage } from 'react-native'

class Messages extends React.Component {

    componentDidMount() {
    }
    
    render() {
        const { id, history, socket } = this.props
        return (
            <View> 
                {this.props.history.map((msgs, i) => {    
                    return (
                        <Text key={i}> {msgs.msg} </Text>
                    )
                })}
            </View>
        )
	}
}

export default Messages;
