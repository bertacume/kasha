import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { FileSystem } from 'expo';

import Icon from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from "react-native";
import { updateCurrentAlbum, setPicIndex, updateDevelopingAlbum, setDevelopingAviable } from '../../actions/actions';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos/';

class HomeScreen extends Component {
  async componentWillMount() {
    //Try to create a new directory 'photos'
    await FileSystem.makeDirectoryAsync(PHOTOS_DIR).catch(e => {
      console.log(e, 'Directory exists');
    });

    //update store current album from local storage
    await this.getFromLocalStorage('currentAlbum', this.props.updateCurrentAlbum);

    //update store current pic index from local storage
    const pics = await FileSystem.readDirectoryAsync(PHOTOS_DIR + this.props.currentAlbum);
    this.props.setPicIndex(pics.length);

    //update store developingAlbum from local storage
    await this.getFromLocalStorage('developingAlbum', this.props.updateDevelopingAlbum);

    //update store developingAviable
    if(this.props.developingAlbum) this.props.setDevelopingAviable(true);
  }

  handlePress = () => {
    this.props.navigation.navigate('NewAlbum');
  }

  getFromLocalStorage = async (key, func) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        await func(value);
      }
    } catch (e) {
      console.log(e, 'Not found');
    }
  }

  renderAlbumContainer = () => {
    if (this.props.currentAlbum) {
      const albumName = this.props.currentAlbum.slice(0, this.props.currentAlbum.lastIndexOf("_"));
      return (
        <View style={styles.item}>
          <Icon name='md-time' size={150} style={styles.icon} />
          <Text style={styles.index}>{this.props.picIndex}</Text>
          {this.props.currentAlbum && <Text>{albumName}</Text>}
        </View>
      );
    }
    return (
      <TouchableHighlight onPress={this.handlePress} underlayColor="white">
        <Icon name='ios-add-circle' size={40} />
      </TouchableHighlight>
    );
  }
  
  renderDevelopingContainer = () => {
    //tres opcions NOTAVIAVBLE - AVIABLE - PROCESS
    if (this.props.developingAlbum) { //PROCESS
      return (
        <View style={styles.item}>
          <Icon name='md-time' size={150} style={styles.icon} />
          <Text style={styles.index}>2h</Text>
          {this.props.developing && <Text>{albumName}</Text>}
        </View>
      );
    } else if (this.props.developingAviable) { //AVIABLE
      return (
        <View style={styles.item}>
          //TODO: onPress setDevelopingAviable --> false, updateDevelopingAlbum --> curent album name
          <Text>START DEVELOP.</Text>
        </View>
      );
    }
    //NOT AVIABLE
    return (
      <View style={styles.item}>
        <Text> DEV. NOT AVIAVBLE</Text>
      </View>
    );
  }
  
  render
  
  render() {
    return (
      <View style={styles.container}>
        {this.props.developingAlbum && <Text>Create a new album: </Text>}
        {this.renderAlbumContainer()}
        <Text>Welcome</Text>
        {this.renderDevelopingContainer()}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  currentAlbum: state.current_album,
  developingAlbum: state.developingAlbum,
  picIndex: state.picIndex,
  developingAviable: state.developingAviable,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentAlbum: (album) => dispatch(updateCurrentAlbum(album)),
  updateDevelopingAlbum: (album) => dispatch(updateDevelopingAlbum(album)),
  setPicIndex: (picIndex) => dispatch(setPicIndex(picIndex)),
  setDevelopingAviable: () => dispatch(setDevelopingAviable()),
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
  text: {
    color: 'rgb(255,255,255)'
  },
  item: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  index: {
    color: 'rgb(0, 0, 0)',
    fontSize: 40,
  },
  icon: {
    flex: 1,
    position: 'absolute',
    color: 'rgba(0, 0, 0, .1)'
  }
});