import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default class ImageItem extends Component {
  render() {
    return (
      <View style={styles.image} source={{ uri: this.props.image }}>
        <Icon name='md-time' size={96} style={styles.icon} />
        <Text style={styles.text}>1</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'rgb(255, 255, 255)',
    fontSize: 40,
  },
  icon: {
    flex: 1,
    position: 'absolute',
    color: 'rgba(0, 0, 0, .1)'
  }
});