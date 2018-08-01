import React from "react";
import { Button, Container, Icon, Content, Form, Item, Input, Label, View, Text, Footer, } from 'native-base';
import { TouchableOpacity } from 'react-native'


class MsgBox extends React.Component {
    state = {
        message: ''
    }
    
    render() {
        const { message } = this.state
        return (
        <Footer >
            <Item  rounded
            style={{backgroundColor:'white', width:'98%'}}
            >
                <Input
                    style={{color:'purple', fontSize:13}}
                    placeholder='Type here...'
                    onChangeText={message => this.setState({ message })}
                    autoCapitalize={'none'} />
                <Button transparent onPress={() => this.props.sendMessage(message)}>
                    <Text style={{marginTop: '4%',marginLeft:'10%', color:'purple'}}>Send Message</Text>
                </Button>
            </Item>
        </Footer>
        )
    }
}

export default MsgBox;
