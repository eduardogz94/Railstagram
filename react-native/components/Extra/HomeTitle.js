import React from "react";
import { Text, View } from 'react-native'

import { title } from '../../assets/css/styles'

const Title = props => (
  <View>
    <Text style={title.main}>{props.tagline}</Text>
  </View>
);


export default Title;
