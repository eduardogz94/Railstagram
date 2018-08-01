import React from "react";
import { View, Text } from "native-base";

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
