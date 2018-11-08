import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class HomeScreen extends Component {
  
  handlePress = () => {
    this.props.navigation.navigate('NewAlbum');
  }

  render() {
    return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Text>Create a new album: </Text>
      <TouchableHighlight onPress={this.handlePress} underlayColor="white">
        <Icon name='ios-add-circle' size={40} onPress={this.handlePress} />
      </TouchableHighlight>
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