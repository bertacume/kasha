import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight, Image, Animated } from 'react-native';
import { FileSystem } from 'expo';
import { updateCurrentAlbum, setPicIndex, updateDevelopingAlbum, setDevelopingAviable, setExpirationDate, fetchAlbums } from '../../actions/actions';
import { getFromLocalStorage, storeDataLocalStorage, removeDataLocalStorage } from '../../helpers/storageHelpers';
import { renderAnimatedSpinners } from '../../helpers/animationHelpers';
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
      'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-ExtraBold': require('../../assets/fonts/Montserrat-ExtraBold.ttf'),
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
    (this.props.picIndex > LIMIT_PICS) ?  this.props.setDevelopingAviable(true) : null;
    this.props.updateDevelopingAlbum(false)
    removeDataLocalStorage('developingAlbum');
    clearInterval(this.myInterval);
  }

  renderAlbumContainer = () => {
    if (this.props.currentAlbum) {
      const albumName = this.props.currentAlbum.slice(0, this.props.currentAlbum.lastIndexOf("_"));
      return (
        <View style={styles.albumContainer}>
          <View style={styles.item}>
            <Image source={require('../../assets/circle-Al.png')} style={styles.ballImage} />
            {this.state.fontLoaded && <Text style={styles.index}>{this.props.picIndex}</Text>}
          </View>
          {this.props.currentAlbum && <Text style={styles.text}>{albumName}</Text>}
        </View>
      );
    }
    return (
      <TouchableHighlight onPress={this.handlePressPlus} underlayColor="transparent" style={styles.plusBtn}>
        <Image source={require('../../assets/addBtn.png')} style={styles.plusImage} />
      </TouchableHighlight>
    );
  }

  renderDevelopingContainer = () => {
    //tres opcions NOTAVIAVBLE - AVIABLE - DEVELOPING
    if (this.props.developingAlbum) { //DEVELOPING
      const developingAlbum = this.props.developingAlbum.slice(0, this.props.developingAlbum.lastIndexOf("_"));
      return (
        <View style={styles.albumContainer}>
          <View style={styles.item}>
            {renderAnimatedSpinners()}
            {/* <Image source={require('../../assets/devAl.gif')} style={styles.ballImage} /> */}
            {/* <Text style={styles.devText}>{DEVELOPING_TIME[0]} {DEVELOPING_TIME[1]}</Text> */}
            <Text style={styles.devText}>DEVELOPING</Text>
          </View>
          <Text style={styles.text}>{developingAlbum}</Text>
        </View>
      );
    } else if (this.props.developingAviable) { //AVIABLE
      return (
        <TouchableHighlight onPress={this.handlePressStartDevelop} underlayColor="white" style={styles.btn}>
          <Text style={styles.text}>Develop film</Text>
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
        <View style={styles.subContainer}>
          {this.renderAlbumContainer()}
          {this.renderDevelopingContainer()}
        </View>
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
    flexDirection: 'column',
    backgroundColor: 'rgb(255, 255, 255)',
    alignItems: 'center',
  },
  subContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  albumContainer: {
    width: 150,
    height: 190,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
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
    fontFamily: 'Montserrat-Light',
  },
  devText: {
    color: '#7aa8af',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
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
    fontSize: 50,
    fontFamily: 'MontserratAlternates-Light',
  },
  icon: {
    flex: 1,
    position: 'absolute',
    color: 'rgba(255, 255, 255, .2)',
  },
  btn: {
    width: '50%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .4)',
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, .2)',
    borderWidth: 4,
  },
  plusImage: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    resizeMode: 'contain',
  },
  plusBtn: {
    width: '20%',
    height: '12%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  AnimatedImage: {

  },
});