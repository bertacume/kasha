import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, FlatList, Image } from 'react-native';
import { FileSystem } from 'expo';
import ImageItem from './ImageItem';
import { PHOTOS_DIR } from '../../helpers/constants';


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
      <ImageItem imageSrc={`${PHOTOS_DIR}${this.props.album}/${fileName}`} fileName={fileName} />
    </View>;
  }

  render() {   
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/bg-reversed.jpg')} style={styles.backgroundImage} />
        <View style={styles.subContainer}>
          <FlatList
            numColumns={3}
            data={this.state.pictures}
            extraData={this.state}
            keyExtractor={(item, index) => item}
            renderItem={({ item, separators }) => this.renderPhoto(item)}
          />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  subContainer: {
    flex: 1,
    marginTop: 90,
    flexDirection: 'column',
    marginHorizontal: 2,
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
    height: (Dimensions.get('window').height / 4) - 12,
    width: (Dimensions.get('window').width / 3) - 6,
  }
});