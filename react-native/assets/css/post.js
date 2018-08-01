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
        fontSize: 10,
        color:'gray'
    },
    viewAll:{
        fontWeight: '600',
        color: 'gray',
        marginLeft: '3%',
    },
    date: {
        fontSize: 8,
        color:'gray'
    },
    deleteComment: {
        marginTop: 2,
    },
    commentInput:{
        color:'black'
    },
    commentsModal: {
        backgroundColor: 'white'
    },
    commentInput: {
        marginTop: '15%',
    }
})