import { StyleSheet } from 'react-native';

export const post = StyleSheet.create({
    main: {
        flex: 1,
        height: 200,
        width: null
    },
    buttonContainer:{
        height:45
    },
    username:{
        fontWeight: '900',
        fontSize: 8,
    },
    bold: {
        fontWeight: '900'
    },
    buttons:{
        color:'purple'
    },
    comments:{
        fontSize: 8,
    },
    date: {
        fontSize: 8,
        color:'gray'
    },
    deleteComment: {
        paddingLeft: -900,
    }
})