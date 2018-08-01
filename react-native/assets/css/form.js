import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export const formStyle = StyleSheet.create({
    main: {
        flex: 3,
    },
    background: {
        backgroundColor:'purple',
        height: 200
    },
    buttonContainer:{
        flex: 1,
        marginTop: '5%',
        marginRight: '5%',
        marginLeft: '5%',
        justifyContent: 'center',
        borderColor: 'black',
        backgroundColor: 'purple',
    },
    username: {
        fontWeight: '900'
    },
    buttons:{
        color:'purple'
    },
    icons:{
        color:'white'
    },
    image: {
        width:200,
        height:200,
        marginHorizontal: '25%',
        marginVertical: '3%',
        borderRadius: 100,
    },
    pictureCover: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    inputs:{
        color:'purple'
    },
    labels:{
        color:'purple'
    },
    loginButtonText: {
        color: 'white',
        justifyContent: 'center',
        marginLeft: 30,
    }
})