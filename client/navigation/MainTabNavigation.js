import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import CamScreen from '../components/screens/CamScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import AlbumNavigation from './AlbumNavigation';
import NewAlbumNavigation from './NewAlbumNavigation';

export default createMaterialTopTabNavigator({
  Home: { screen: NewAlbumNavigation,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Icon name='md-home' size={32} color={tintColor} />
      )
    }
  },
  Roll: { screen: AlbumNavigation,
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
  swipeEnabled: true,
  tabBarPosition: 'bottom',
  navigationOptions: {
    tabBarVisible: false,
  },
  tabBarOptions: {
    activeTintColor: '#7ae2ba',
    inactiveTintColor: 'grey',
    showLabel: false,
    showIcon: false,
    style: {
      backgroundColor: 'transparent'
    },
    indicatorStyle: {
      opacity: 0
    }
  }
});