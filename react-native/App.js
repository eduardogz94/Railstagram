import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';

import Auth, { UserContext } from './components/Auth/Auth';
import { UserStack, GuestStack } from './components/Routes'

export default class App extends React.Component {

    state = {
        token: null
    }

    render() {
        const UserConsumer = UserContext.Consumer
        const { token } = this.state
        return (
            <View style={styles.container}>
            <Auth>
                {(token != null) ? 
                        <UserConsumer>
                            {token => <UserStack token={token}/>}
                        </UserConsumer>
                : <GuestStack/>
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