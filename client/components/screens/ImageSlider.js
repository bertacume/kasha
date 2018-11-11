import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';

export default class ImageItem extends Component {
  
  render() {
    return (<ImageSlider images={[
      'http://placeimg.com/640/480/any',
      'http://placeimg.com/640/480/any',
      'http://placeimg.com/640/480/any'
    ]}/>)
  }
}
