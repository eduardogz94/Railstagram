import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Image} from 'react-native';

import logoImg from '../../assets/images/index.jpeg';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
        <Text style={styles.text}>ZAVELLASTAGRAM</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
});