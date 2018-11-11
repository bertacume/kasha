import React, { Component } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('/');
};


export default class ImageItem extends Component {
  
  render() {
    const { imageSrc, fileName } =  this.props;
    const name = fileName.slice(0, fileName.lastIndexOf('.'));
    const date = new Date(parseInt(name));
    console.log(date.yyyymmdd());
    return (
      <View style={styles.imageContainer}>
      <Image
          style={styles.ballImage}
          source={{uri: imageSrc}}
        />        
        <Text style={styles.text}>{date.yyyymmdd()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: null,
    alignSelf: 'stretch'
  },
  ballImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 4,
  },
  text: {
    color: 'rgb(255, 255, 255)',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 5,
  }
});