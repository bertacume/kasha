import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import { FileSystem } from 'expo';
import ImageItem from '../presentational/ImageItem';
import { connect } from 'react-redux';
import { fetchPictures } from '../../actions/actions';


const PHOTOS_DIR = FileSystem.documentDirectory + 'photos';

class RollScreen extends Component {
  state = {
    photos: []
  };

  componentWillMount = async () => {
    const pics = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.props.fetchPictures(pics);
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
          {this.props.pictures ? this.props.pictures.map(this.renderPhoto): <Text>Loading...</Text>}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  pictures: state.pictures,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPictures: (pictures) => dispatch(fetchPictures(pictures))
});

export default connect(mapStateToProps, mapDispatchToProps)(RollScreen);

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