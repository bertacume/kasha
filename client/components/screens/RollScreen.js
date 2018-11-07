import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { FileSystem } from 'expo';


const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

export default class RollScreen extends Component {
  state = {
    photos: []
  };

  componentDidMount = async () => {
    const photos = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.setState({ photos });
  };

  renderPhoto = fileName => {
    return <View key={fileName} style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: `${PHOTOS_DIR}/${fileName}` }}
      />
    </View>;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.photos.map(this.renderPhoto)}
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
  image: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain'
  }
});