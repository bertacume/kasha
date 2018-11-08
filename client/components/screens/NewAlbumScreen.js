import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput } from 'react-native';

export default class NewAlbumScreen extends Component {
  state = {
    title: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/bg-blur.jpg')} style={styles.backgroundImage} />
        <View style={styles.content}>
          <Text style={styles.text}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    backgroundColor: '#ccc',
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  input: {
    margin: 15,
    padding: 10,
    height: 50,
    width: '100%',
    borderColor: 'rgb(255, 255, 255)',
    backgroundColor: 'rgba(255, 255, 255, .5)',
    borderWidth: 1,
    borderRadius: 5
  },
  text: {
    color: 'rgb(255, 255, 255)',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: 1,
  }
});