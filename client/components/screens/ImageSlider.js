import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';

export default class ImageItem extends Component {
  
  render() {
    const { navigation } = this.props;
    const pics =  navigation.getParam('pictures');
    const directory = navigation.getParam('directory');
    return (<ImageSlider images={pics.map(pic => `${directory}/${pic}`)}/>)
  }
}
