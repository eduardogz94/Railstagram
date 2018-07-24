import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Home'

import LoginForm from './Users/LoginForm'
import SignupForm from './Users/SignupForm'
import FindUser from './Users/FindUser'
import Profile from './Users/Profile'
import EditProfile from './Users/EditProfile'

import Uploading from './Post/Upload'

export const Index = createStackNavigator({
    Home:{
      screen:Home,
      navigationOptions:{
          title:'Railstagram'
      },
    },
    User: {
      screen: Profile,
      navigationOptions: {
        title: 'Profile'
      }
    },
    Photo: {
      screen: Uploading,
      navigationOptions: {
        title: 'Upload'
      }
    }
});

export const User = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile'
    }
  },
  Settings: {
    screen: EditProfile,
    navigationOptions: {
      title: 'Edit Profile'
    }
  }
});

export const Signup = createStackNavigator({
  Signup:{
    screen:SignupForm,
    navigationOptions:{
      title:'Signup'
    },
  }
});

export const Users = createStackNavigator({
  Users:{
    screen:FindUser,
    navigationOptions:{
      title:'Find Users'
    }
  },
  User:{
    screen:Profile,
    navigationOptions: {
      title: 'Profile User'
    }
  },
});

export const Upload = createStackNavigator({
  Post:{
    screen:Uploading,
    navigationOptions: {
      title:'Upload'
    }
  }
});

export const Login = createStackNavigator({
    Login:{
      screen:LoginForm
    }
});

export const UserStack = createBottomTabNavigator(
  {
    Home:Index,
    Users: Users,
    Profile:User,
    Upload:Upload
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName == 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-contact${focused ? '' : '-outline'}`;
        } else if (routeName === 'Users') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        } else if (routeName === 'Upload') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        }
          
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return(
          <Ionicons name={iconName} size={25} color={tintColor} />
        )
          
      },
    }),
      tabBarOptions: {
        activeTintColor: 'purple',
        inactiveTintColor: 'gray',
      },
    }
  );