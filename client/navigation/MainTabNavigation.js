import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '../components/screens/HomeScreen';
import RollScreen from '../components/screens/RollScreen';
import CamScreen from '../components/screens/CamScreen';
import Icon from 'react-native-vector-icons/Ionicons';


export default createBottomTabNavigator({
  Home: { screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name='md-home' size={32} color={tintColor} />
      )
    }
  },
  Roll: { screen: RollScreen,
    navigationOptions: {
      tabBarLabel: 'Roll',
      tabBarIcon: ({tintColor}) => (
        <Icon name='ios-film' size={32} color={tintColor} />
      )
    }
  },
  Cam: { screen: CamScreen,
    navigationOptions: {
      tabBarLabel: 'Cam',
      tabBarIcon: ({tintColor}) => (
        <Icon name='md-camera' size={32} color={tintColor} />
      )
    }

  }
}, {
  initialRouteName: 'Home',
  order: ['Roll', 'Home', 'Cam'],
  navigationOptions: {
    tabBarVisible: true,
  },
  tabBarOptions: {
    activeTintColor: '#7ae2ba',
    inactiveTintColor: 'grey',
    showLabel: false
  }
});