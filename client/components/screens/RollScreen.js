import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class RollScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Roll</Text>
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
});