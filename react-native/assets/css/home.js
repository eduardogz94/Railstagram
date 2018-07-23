import { StyleSheet } from 'react-native';

export const home = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#fff'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    profile: {
        marginLeft: '75%',
    },
    like: {
        marginLeft: '2%',
    },
    comment: {
        marginLeft: '7%',
    },
    upload: {
        marginLeft: 15,
    },
    chat: {
        marginRight: 15,
    }
});