import React from "react";
import { Text, View } from 'react-native'

const Title = props => (
  <View>
    <Text>Title</Text>
    <Text>{props.tagline}</Text>
  </View>
);


export default Title;
