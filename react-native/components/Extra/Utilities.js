import React , { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { post } from '../../assets/css/post'

export const getDate = date => {
    const primary_date = date.substring(0, date.indexOf('T'))
    const finalDate = primary_date.split('-').reverse().join('-')

    return(<Text style={post.comments}>{finalDate}</Text>)
}