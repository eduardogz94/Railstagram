import React from "react";
import { View, Input, Item, Text } from "native-base";
import { TouchableOpacity } from 'react-native'


class MsgBox extends React.Component {
    state = {
        message: ''
    }
    
    render() {
        const { message } = this.state
        return (
        <View >
            <Item  
            style={{backgroundColor:'white', width:'100%', height:'30%'}}>
                <Input
                    style={{color:'black', fontSize:16}}
                    onChangeText={message => this.setState({ message })}
                    autoCapitalize={'none'} />
                <TouchableOpacity onPress={() => this.props.sendMessage(message)}>
                    <Text>Send</Text>
                </TouchableOpacity>
            </Item>
        </View>
        )
    }
}

export default MsgBox;
