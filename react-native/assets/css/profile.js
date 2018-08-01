import Dimensions from 'Dimensions';
import { StyleSheet } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export const profile = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    profileTab: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    data: {
        flex:1,
        alignItems: 'center',
    },
    image: {
        width: 75, 
        height: 75, 
        borderRadius: 37.5
    },
    edit: {
        flex: 2,
        marginRight: '2%',
        marginLeft: '30%',
        justifyContent: 'center',
        borderColor: 'black',
        backgroundColor: 'white'
    },
    follow: {
        flex: 1,
        marginRight: '7%',
        marginLeft: '30%',
        justifyContent: 'center',
        borderColor: 'black',
        backgroundColor: 'white'
    },
    unfollow: {
        flex: 1,
        marginRight: '7%',
        marginLeft: '30%',
        justifyContent: 'center',
        borderColor: 'black',
        backgroundColor: 'purple'
    },
    unfollowText: {
        color:'white'
    },
    logout: {
        marginRight: 15,
        width: '14%',
        justifyContent: 'center',
    },
    text: {
        marginBottom: '5%',
    },
    dashboard: {
        flexDirection: 'row', 
        justifyContent: 'space-around',
    },
    stats: {
        alignItems: 'center'
    },
    statsText: {
        fontSize: 10, color: 'gray'
    },
    rows:{
        flexDirection: 'row',
        marginTop: -35,
    },
    dataText: {
        paddingTop: 15,
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    username: {
       fontWeight:'bold' 
    },
    tabs:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 5,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    images: {
        width: DEVICE_WIDTH/3,
        height: DEVICE_HEIGHT/3,
        marginBottom: 2,
    },
    imageIndex: {
        flex: 1,
        width:undefined,
        height:undefined
    },
    userData:{
        fontSize: 10,
        color:'gray'
    },
    sectionOne:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    }


});