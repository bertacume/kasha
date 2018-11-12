import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image, Text, TextInput, TouchableHighlight } from 'react-native';
import { updateCurrentAlbum, fetchAlbums } from '../../actions/actions';
import { storeDataLocalStorage } from '../../helpers/storageHelpers';
import { FileSystem } from 'expo';
import { PHOTOS_DIR } from '../../helpers/constants';


class NewAlbumScreen extends Component {
  state = {
    title: '',
    emptyMssg: '',
  }

  handlePress = async () => {
    if (!this.state.title.length) { //Empty Field
      this.setState({ emptyMssg: 'Empty Field. Please enter an album name.' });
      return;
    }
    if (this.props.currentAlbum && this.props.currentAlbum.length) { //Not 36 pics yet
      this.setState({ emptyMssg: 'Film in process' })
      return;
    }
    const album = `${this.state.title}_${Date.now()}`;
    if (this.props.albums.includes(album)) { //Album name cant be the same
      this.setState({ emptyMssg: 'This album already exists' })
      return;
    }
    FileSystem.makeDirectoryAsync(PHOTOS_DIR + album).catch(e => {
      console.log(e, `Directory ${this.state.title} exists`);
    });
    this.props.updateCurrentAlbum(album);
    storeDataLocalStorage('currentAlbum', album);
    const albums = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.props.fetchAlbums(albums);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/bg-blur.jpg')} style={styles.backgroundImage} />
        <View style={styles.content}>
          <Text>{this.state.emptyMssg}</Text>
          <Text style={styles.text}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={(title) => this.setState({ title, emptyMssg: '' })}
            value={this.state.text}
          />
          <TouchableHighlight onPress={this.handlePress} underlayColor="transparent" style={styles.tickBtn}>
            <Image source={require('../../assets/tickBtn.png')} style={styles.tickImage} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  currentAlbum: state.currentAlbum,
  albums: state.albums,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentAlbum: (album) => dispatch(updateCurrentAlbum(album)),
  fetchAlbums: (albums) => dispatch(fetchAlbums(albums)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbumScreen);

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
    backgroundColor: 'rgba(255, 255, 255, .4)',
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, .2)',
    borderWidth: 4,
    color: 'rgb(255, 255, 255)',
  },
  text: {
    color: 'rgb(255, 255, 255)',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'Montserrat-Light',
  },
  touch: {
    borderRadius: 50,
  },
  icon: {
    color: 'rgb(255, 255, 255)'
  },
  tickImage: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    resizeMode: 'contain',
  },
  tickBtn: {
    width: '20%',
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});