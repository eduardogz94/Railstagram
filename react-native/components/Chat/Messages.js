import React from "react";
<<<<<<< HEAD
import { View, Text } from "native-base";
=======
import Sender from "./Sender";
import { View, Label, Text } from "native-base";
import { AsyncStorage } from 'react-native'
>>>>>>> 9d702821b096b4349e931a11ab481d7f377069ce

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
