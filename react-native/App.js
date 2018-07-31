import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';

import Auth, { UserContext } from './components/Auth/Auth';
import { UserStack, GuestStack } from './components/Routes'

export default class App extends React.Component {

    state = {
        token: null
    }

    componentWillMount () {
        AsyncStorage.getItem('token').then(token => {
            this.setState({ token })
        })
    }

    updateToken = token => {
        this.setState({ token })
    }


    render() {
        const UserConsumer = UserContext.Consumer
        const { token } = this.state
        return (
            <View style={styles.container}>
                <Auth update={this.updateToken}>
                    {(token != null) ? 
                            <UserConsumer>
                                {session => <UserStack token={token}/>}
                            </UserConsumer>
                    : <GuestStack />
                    }
                </Auth>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});