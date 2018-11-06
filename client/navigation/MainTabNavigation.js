import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from '../components/screens/HomeScreen';
import RollScreen from '../components/screens/RollScreen';

export default createBottomTabNavigator({
  HomeScreen: HomeScreen,
  RollScreen: RollScreen
});