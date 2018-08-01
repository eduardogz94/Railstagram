import Dimensions from 'Dimensions';
import { StyleSheet } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export const direct = StyleSheet.create({
    main:{
        flex:3
    },
    right: {
        alignContent: 'flex-start',
        marginLeft: '50%',
    },
    left: {
        alignContent: 'flex-end',
        marginRight: '50%'
    }
})