import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import MainTabNavigation from './navigation/MainTabNavigation.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MainTabNavigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
});
