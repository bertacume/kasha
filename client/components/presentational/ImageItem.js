import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, Text } from 'react-native';

export default class ImageItem extends Component {
  render() {
    return (
      <Image
          style={styles.image}
          source={{uri: this.props.image}}
        />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    alignSelf: 'stretch'
  }
});