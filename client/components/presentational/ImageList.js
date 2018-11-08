import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, FlatList } from 'react-native';
import { FileSystem } from 'expo';
import ImageItem from './ImageItem';


const PHOTOS_DIR = FileSystem.documentDirectory + 'photos/';

export default class ImageList extends Component {
  state = {
    pictures: []
  }

  componentWillMount = async () => {
    const pics = await FileSystem.readDirectoryAsync(PHOTOS_DIR + this.props.album);
    this.setState({pictures: pics});
  };

  renderPhoto = fileName => {
    return <View key={fileName} style={styles.imageWrap}>
      <ImageItem image={`${PHOTOS_DIR}${this.props.album}/${fileName}`} />
    </View>;
  }

  render() {   
    return (
          <FlatList
            numColumns={3}
            data={this.state.pictures}
            extraData={this.state}
            keyExtractor={(item, index) => item}
            renderItem={({ item, separators }) => this.renderPhoto(item)}
          />
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
    padding: 2,
    height: (Dimensions.get('window').height / 5) - 12,
    width: (Dimensions.get('window').width / 3) - 4,
    backgroundColor: '#62686d'
  }
});