import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class HomeScreen extends Component {
  render() {
    return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Text>Create a new album: </Text>
      <Icon name='ios-add-circle' size={40}/>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  text: {
    color: 'rgb(255,255,255)'
  }
});