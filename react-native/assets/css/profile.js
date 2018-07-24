import { StyleSheet } from 'react-native';

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
        flex:1,
        width:'100%',
        marginLeft: '40%',
        justifyContent: 'center',
        borderColor: 'black',
        backgroundColor: 'white'
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
    }


});