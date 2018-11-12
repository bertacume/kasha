import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, FlatList, Image } from 'react-native';
import { FileSystem } from 'expo';
import DevelopingItem from './DevelopingItem';
import { PHOTOS_DIR } from '../../helpers/constants';


export default class ImageList extends Component {
  state = {
    pictures: []
  }

  componentWillMount = async () => {
    const pics = await FileSystem.readDirectoryAsync(PHOTOS_DIR + this.props.album);
    this.setState({ pictures: pics });
    console.log(this.props.navigation);
    this.props.navigation.setParams({title: 'Darkroom'});
  };

  renderPhoto = (fileName, index) => {
    return <View key={fileName} style={styles.imageWrap}>
    <DevelopingItem picIndex={index} imageSrc={`${PHOTOS_DIR}${this.props.album}/${fileName}`} />
  </View>;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/bg-darkroom-reversed.jpg')} style={styles.backgroundImage} />
        <View style={styles.subContainer}>
          <FlatList
            numColumns={3}
            data={this.state.pictures}
            extraData={this.state}
            keyExtractor={(item, index) => item}
            renderItem={({ item, index }) => this.renderPhoto(item, index)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)',
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
    backgroundColor: 'rgb(255, 255, 255)',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrap: {
    margin: 2,
    height: (Dimensions.get('window').height / 5) - 12,
    width: (Dimensions.get('window').width / 3) - 6,
  },
});