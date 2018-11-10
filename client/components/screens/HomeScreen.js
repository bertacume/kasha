import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native';
import { FileSystem } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import { updateCurrentAlbum, setPicIndex, updateDevelopingAlbum, setDevelopingAviable, setExpirationDate, fetchAlbums } from '../../actions/actions';
import { getFromLocalStorage, storeDataLocalStorage, removeDataLocalStorage } from '../../helpers/helpers';
import { PHOTOS_DIR, LIMIT_PICS, DEVELOPING_TIME } from '../../helpers/constants';
import { Font } from 'expo';

class HomeScreen extends Component {
  state = {
    fontLoaded: false,
  };

  myInterval = null

  async componentWillMount() {
    await Font.loadAsync({
      'MontserratAlternates-Light': require('../../assets/fonts/MontserratAlternates-Light.ttf'),
    });
    this.setState({ fontLoaded: true });
    // Try to create a new directory 'photos'
    console.log('bye', PHOTOS_DIR);
    await FileSystem.makeDirectoryAsync(PHOTOS_DIR).catch(e => {
      console.log(e, 'Directory exists');
    });

    //update store albums from local storage
    const albums = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.props.fetchAlbums(albums);

    //update store current album from local storage
    await getFromLocalStorage('currentAlbum', this.props.updateCurrentAlbum);

    //update store current pic index from local storage
    if (this.props.currentAlbum) {
      const pics = await FileSystem.readDirectoryAsync(PHOTOS_DIR + this.props.currentAlbum);
      this.props.setPicIndex(pics.length);
    } else this.props.setPicIndex(0);

    //update store developingAviable
    if (this.props.picIndex >= LIMIT_PICS) {
      await this.props.setDevelopingAviable(true);
    }

    //update store expirationDate
    await getFromLocalStorage('expirationDate', (value) => this.props.setExpirationDate(Date.parse(value)));

    //update store developingAlbum from local storage
    await getFromLocalStorage('developingAlbum', this.props.updateDevelopingAlbum);
    if (this.props.developingAlbum) {
      this.checkTimer();
      this.myInterval = setInterval(() => this.checkTimer(), 60 * 1000);
    }
  }


  handlePressPlus = () => {
    this.props.navigation.navigate('NewAlbum');
  }

  handlePressStartDevelop = async () => {
    this.startTimer(...DEVELOPING_TIME);

    await this.props.updateDevelopingAlbum(this.props.currentAlbum);
    storeDataLocalStorage('developingAlbum', this.props.currentAlbum);

    this.props.updateCurrentAlbum(false);
    removeDataLocalStorage('currentAlbum');

    this.props.setDevelopingAviable(false);

    this.props.setPicIndex(0);

    this.checkTimer();
    this.myInterval = setInterval(() => this.checkTimer(), 60 * 1000);
  }

  startTimer = (time, unit) => {
    let expirationDate;
    if (unit === 'min') {
      const now = new Date();
      expirationDate = new Date(now.getTime() + time * 60000);
      console.log(`${time} min`, expirationDate.toLocaleString());
    }
    if (unit === 'day') {
      expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + time);
      console.log(`${time} day`, expirationDate.toLocaleString());
    }
    this.props.setExpirationDate(expirationDate);
    storeDataLocalStorage('expirationDate', expirationDate);
  }

  checkTimer = () => {
    if (this.props.expirationDate > new Date()) return;
    this.props.setExpirationDate(false);
    removeDataLocalStorage('expirationDate');
    this.props.updateDevelopingAlbum(false);
    removeDataLocalStorage('developingAlbum');
    clearInterval(this.myInterval);
  }

  renderAlbumContainer = () => {
    if (this.props.currentAlbum) {
      const albumName = this.props.currentAlbum.slice(0, this.props.currentAlbum.lastIndexOf("_"));
      return (
        <View style={styles.item}>
          <View style={styles.item}>
            <Image source={require('../../assets/circle-Al.png')} style={styles.ballImage} />
            {this.state.fontLoaded && <Text style={styles.index}>{this.props.picIndex}</Text>}
          </View>
          {this.props.currentAlbum && <Text style={styles.text}>{albumName}</Text>}
        </View>
      );
    }
    return (
      <TouchableHighlight onPress={this.handlePressPlus} underlayColor="white">
        <Icon name='ios-add-circle' size={40} />
      </TouchableHighlight>
    );
  }

  renderDevelopingContainer = () => {
    //tres opcions NOTAVIAVBLE - AVIABLE - DEVELOPING
    if (this.props.developingAlbum) { //DEVELOPING
      return (
        <View style={styles.item}>
          <Icon name='md-time' size={150} style={styles.icon} />
          <Text style={styles.index}>2h</Text>
          {this.props.developing && <Text>{albumName}</Text>}
        </View>
      );
    } else if (this.props.developingAviable) { //AVIABLE
      return (
        <TouchableHighlight onPress={this.handlePressStartDevelop} underlayColor="white">
          <View style={styles.item}>
            <Text>START DEVELOP.</Text>
          </View>
        </TouchableHighlight>
      );
    }
    //NOT AVIABLE
    return (
      <View style={styles.item}>
        <Text> DEV. NOT AVIAVBLE</Text>
      </View>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/bg.jpg')} style={styles.backgroundImage} />
        {this.props.developingAlbum && <Text>Create a new album: </Text>}
        {this.renderAlbumContainer()}
        {this.renderDevelopingContainer()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  currentAlbum: state.currentAlbum,
  developingAlbum: state.developingAlbum,
  picIndex: state.picIndex,
  developingAviable: state.developingAviable,
  expirationDate: state.expirationDate,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentAlbum: (album) => dispatch(updateCurrentAlbum(album)),
  updateDevelopingAlbum: (album) => dispatch(updateDevelopingAlbum(album)),
  setPicIndex: (picIndex) => dispatch(setPicIndex(picIndex)),
  setDevelopingAviable: (flag) => dispatch(setDevelopingAviable(flag)),
  setExpirationDate: (date) => dispatch(setExpirationDate(date)),
  fetchAlbums: (albums) => dispatch(fetchAlbums(albums)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideDefault: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
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
  ballImage: {
    backgroundColor: '#ccc',
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  text: {
    color: 'rgb(255,255,255)',
    fontSize: 20,    
    fontFamily: 'MontserratAlternates-Light',
  },
  item: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  index: {
    color: '#7aa8af',
    fontSize: 60,
    fontFamily: 'MontserratAlternates-Light',
  },
  icon: {
    flex: 1,
    position: 'absolute',
    color: 'rgba(0, 0, 0, .1)'
  }
});