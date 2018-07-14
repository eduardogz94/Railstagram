import Dimensions from 'Dimensions';
import { StyleSheet } from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export const inputs = StyleSheet.create({
  inputWrapper: {
    flex: 3,
    backgroundColor: '#fff'
  },
  login: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 20,
    color: 'black',
  }
});

export const buttons = StyleSheet.create({
  
})

export const title = StyleSheet.create({
  main:{
    backgroundColor: '#fff',
    fontSize: 30,
    marginHorizontal: 100
  },
    
})