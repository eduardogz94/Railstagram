import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Home'

import User from './Users/User'
import LoginForm from './Users/LoginForm'
import SignupForm from './Users/SignupForm'
import FindUser from './Users/FindUser'

export const Index = createStackNavigator({
    Home:{
        screen:Home,
        navigationOptions:{
            title:'Home'
        }
    } 
});

export const UserStack = createBottomTabNavigator(
  {
    Home:Index,
    Users: FindUser,
    Login: LoginForm,
    Signup: SignupForm,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName == 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Login') {
          iconName = `ios-contact${focused ? '' : '-outline'}`;
        } else if (routeName === 'Signup') {
          iconName = `ios-contact${focused ? '' : '-outline'}`;
        } else if (routeName === 'Users') {
            iconName = `ios-people${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'purple',
      inactiveTintColor: 'gray',
    },
  }
);
