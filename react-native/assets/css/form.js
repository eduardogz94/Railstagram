import { StyleSheet } from 'react-native';

export const formStyle = StyleSheet.create({
    main: {
        flex: 3,
    },
    buttonContainer:{
        flex: 1,
        marginTop: '5%',
        marginRight: '5%',
        marginLeft: '5%',
        justifyContent: 'center',
        borderColor: 'black',
        backgroundColor: 'white'
    },
    username: {
        fontWeight: '900'
    },
    buttons:{
        color:'purple'
    },
    image: {
        width:200,
        height:200,
        marginHorizontal: '25%',
        marginVertical: '3%',
    },
    pictureCover: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    }
})