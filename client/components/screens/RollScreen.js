import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { FileSystem } from 'expo';
import ImageItem from '../container/ImageItem';


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
    return <View key={fileName} style={styles.imageWrap}>
      <ImageItem image={`${PHOTOS_DIR}/${fileName}`} />
    </View>;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Roll:</Text>
        <View style={styles.wraper}>
          {this.state.photos.map(this.renderPhoto)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    flexDirection: 'column',
  },
  wraper: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'rgb(255, 255, 255)',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  imageWrap: {
    margin: 2,
    // padding: 2,
    height: (Dimensions.get('window').height / 5) - 12,
    width: (Dimensions.get('window').width / 3) - 4,
    backgroundColor: '#62686d'
  }
});