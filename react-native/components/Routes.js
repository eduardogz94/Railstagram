import React from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './Home'

import LoginForm from './Users/LoginForm'
import SignupForm from './Users/SignupForm'
import FindUser from './Users/FindUser'
import Profile from './Users/Profile'
import Uploading from './Post/Upload'

export const Index = createStackNavigator({
    Home:{
      screen:Home,
      navigationOptions:{
          title:'Railstagram'
      }
    }
});

export const User = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Railstagram'
    }
  }
});
export const Login = createStackNavigator({
    Login:{
      screen:LoginForm,
      navigationOptions:{
          title:'Railstagram'
      }
    }
});

export const Signup = createStackNavigator({
    Signup:{
      screen:SignupForm,
      navigationOptions:{
          title:'Railstagram'
      }
    }
});

export const Users = createStackNavigator({
  Users:{
    screen:FindUser,
    navigationOptions:{
        title:'Railstagram'
    }
  }
});

export const Upload = createStackNavigator({
  Users:{
    screen:Uploading,
    navigationOptions:{
        title:'Railstagram'
    }
  }
});

export const GuestStack = createBottomTabNavigator(
  {
    Home:Index,
    Users: Users,
    Login: Login,
    Signup: Signup
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

export const UserStack = createBottomTabNavigator(
  {
    Home:Index,
    Users: Users,
    Profile:User,
    Upload:Uploading
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
