import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { FileSystem } from 'expo';

import Icon from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from "react-native";
import { updateCurrentAlbum } from '../../actions/actions';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos/';

class HomeScreen extends Component {

  async componentWillMount() {
    this.retrieveCurrentAlbum();
    await FileSystem.makeDirectoryAsync(PHOTOS_DIR).catch(e => {
      console.log(e, 'Directory exists');
    });
  }
  
  handlePress = () => {
    this.props.navigation.navigate('NewAlbum');
  }

  retrieveCurrentAlbum = async () => {
    try {
      const value = await AsyncStorage.getItem('currentAlbum');
      if (value !== null) {
        await this.props.updateCurrentAlbum(value);
      }
     } catch (e) {
       console.log(e, 'Not found');
     }
  }

  render() {
    return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Text>Create a new album: </Text>
      <TouchableHighlight onPress={this.handlePress} underlayColor="white">
        <Icon name='ios-add-circle' size={40}/>
      </TouchableHighlight>
    </View>
    );
  }
}

const mapStateToProps = (state) => ({
  currentAlbum: state.current_album,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentAlbum: (album) => dispatch(updateCurrentAlbum(album)),
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
  }
});