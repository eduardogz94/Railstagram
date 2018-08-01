import React from "react";
import { Button, Container, Icon, Content, Form, Item, Input, Label, View, Text } from 'native-base';
import { TouchableOpacity } from 'react-native'


class MsgBox extends React.Component {
    state = {
        message: ''
    }
    
    render() {
        const { message } = this.state
        return (
        <View style={{flex:3}} >
            <Item  rounded
            style={{backgroundColor:'white', width:'100%', height:'36%'}}>
                <Input
                    style={{color:'purple', fontSize:13}}
                    onChangeText={message => this.setState({ message })}
                    autoCapitalize={'none'} />
                <Button transparent onPress={() => this.props.sendMessage(message)}>
                    <Text style={{marginTop: '4%', color:'purple'}}>Send</Text>
                </Button>
            </Item>
        </View>
        )
    }
}

export default MsgBox;
