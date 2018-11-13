import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, FlatList, Image, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { FileSystem } from 'expo';
import ImageItem from './ImageItem';
import Icon from 'react-native-vector-icons/Ionicons';
import { PHOTOS_DIR } from '../../helpers/constants';
import { fetchAlbums } from '../../actions/actions';
import Dialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';

class ImageList extends Component {
  state = {
    pictures: [],
    visible: false,
  }

  componentWillMount = async () => {
    const pics = await FileSystem.readDirectoryAsync(PHOTOS_DIR + this.props.album);
    this.setState({ pictures: pics });
  };

  handlePress = (index) => {
    this.props.navigation.navigate('Slides', { pictures: this.state.pictures, position: index, directory: PHOTOS_DIR + this.props.album });
  }

  handleDelete = async () => {
    this.setState({ visible: true }); 
  }

  deleteYes = async () => {
    await FileSystem.deleteAsync(`${PHOTOS_DIR}/${this.props.album}`);
    const albums = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.props.fetchAlbums(albums);
    this.setState({ visible: false })
    this.props.navigation.navigate('Roll', { delete: true });
  }

  renderPhoto = (fileName, index) => {
    return <View key={fileName} style={styles.imageWrap}>
      <TouchableHighlight onPress={() => this.handlePress(index)} underlayColor="transparent" style={styles.btn}>
        <ImageItem imageSrc={`${PHOTOS_DIR}${this.props.album}/${fileName}`} fileName={fileName} />
      </TouchableHighlight>
    </View>;
  }

  render() {
    const albumName = this.props.album.slice(0, this.props.album.indexOf('_'));
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/bg-reversed.jpg')} style={styles.backgroundImage} />
        <TouchableHighlight onPress={() => this.handleDelete()} underlayColor="transparent" style={styles.icon}>
          <Icon name='md-trash' size={24} color={'rgb(255, 255, 255)'} />
        </TouchableHighlight>
        <View style={styles.subContainer}>
          <Text style={styles.title}>{albumName}</Text>
          <FlatList
            numColumns={3}
            data={this.state.pictures}
            extraData={this.state}
            keyExtractor={(item, index) => item}
            renderItem={({ item, index }) => this.renderPhoto(item, index)}
          />
          <Dialog
            visible={this.state.visible}
            actions={[
              <DialogButton
                key={0}
                text='YES'
                onPress={() => this.deleteYes()}
                textStyle={styles.blueText}
              />,
              <DialogButton
                key={1}
                text='CANCEL'
                onPress={() => this.setState({ visible: false })}
                textStyle={styles.blueText}
              />
            ]}
            dialogStyle={styles.dialogContainer}
          >
            <DialogContent style={styles.dialogContent} >
              <Text style={styles.dialogText}>Are you sure you want to delete {albumName}?</Text>
            </DialogContent>
          </Dialog>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  albums: state.albums,
  currentAlbum: state.currentAlbum,
  developingAlbum: state.developingAlbum,
  thumbnailPics: state.thumbnailPics,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbums: (albums) => dispatch(fetchAlbums(albums)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageList);

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
    marginTop: 10,
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
  },
  btn: {
    height: '100%',
    width: '100%',
  },
  title: {
    color: '#006e6c',
    fontFamily: 'Montserrat-ExtraBold',
    letterSpacing: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  icon: {
    alignSelf: 'flex-end',
    marginTop: 45,
    marginRight: 20,
  },
  dialogContainer: {
    alignItems: 'center',
    height: 145,
    backgroundColor: 'rgb(255, 255, 255)',
    marginHorizontal: 20,
  },
  dialogContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
  },
  dialogText: {
    color: 'rgb(122, 168, 175)',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  blueText: {
    color: 'rgb(122, 168, 175)',
  },
});