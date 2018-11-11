import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

export default class ImageItem extends Component {
  render() {
    return (
      <View style={styles.imageContainer}>
        <Image source={{uri: this.props.imageSrc}} blurRadius={20} style={styles.ballImage} />        
        <Text style={styles.text}>{this.props.picIndex + 1}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(255, 255, 255, .5)',
    fontSize: 40,
    fontFamily: 'MontserratAlternates-Light',
  },
  icon: {
    flex: 1,
    position: 'absolute',
    color: 'rgba(0, 0, 0, .1)'
  },
  ballImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    opacity: .5,
    borderRadius: 10,
  },
});