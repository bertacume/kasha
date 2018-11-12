import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper';


export default class ImageItem extends Component {
  
  renderImages = (navigation) => {
    const pics =  navigation.getParam('pictures');
    const directory = navigation.getParam('directory');
    return pics.map((pic, index)=> {
      return(
        <View style={styles.slide} key={index} >
          <Image source={{uri: `${directory}/${pic}`}} style={styles.backgroundImage} />
        </View>
      );
    })
  }

  render(){
    const { navigation } = this.props;
    const position = navigation.getParam('position');
    return (
      <Swiper style={styles.wrapper} showsButtons={true} index={position}>
        {this.renderImages(navigation)}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
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
});