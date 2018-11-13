import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight, CameraRoll } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import Dialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class ImageItem extends Component {
  state = {
    visible: false,
  }
  handlePress = async (pic, directory) => {
    await CameraRoll.saveToCameraRoll(`${directory}/${pic}`);
    this.setState({ visible: true });
  }

  renderImages = (navigation) => {
    const pics = navigation.getParam('pictures');
    const directory = navigation.getParam('directory');
    return pics.map((pic, index) => {
      return (
        <View style={styles.slide} key={index} >
          <Image source={{ uri: `${directory}/${pic}` }} style={styles.backgroundImage} />
          <View style={styles.subContainer}>
            <TouchableHighlight onPress={() => this.handlePress(pic, directory)} underlayColor='transparent'>
            <MaterialCommunityIcons name='progress-download' style={styles.downloadBtn} />
              {/* <Icon name='md-download' size={40} color={'rgba(255, 255, 255, .8)'} /> */}
            </TouchableHighlight>
          </View>
        </View>
      );
    })
  }

  render() {
    const { navigation } = this.props;
    const position = navigation.getParam('position');
    return (
      <View style={{ flex: 1 }}>
        <Swiper style={styles.wrapper} showsButtons={true} index={position}>
          {this.renderImages(navigation)}
        </Swiper>
        <Dialog
            visible={this.state.visible}
            actions={[
              <DialogButton
              // style={{height: 10}}
                key={0}
                text='OK'
                onPress={() => this.setState({ visible: false })}
                textStyle={styles.blueText}
              />
            ]}
            dialogStyle={styles.dialogContainer}
          >
            <DialogContent style={styles.dialogContent} >
              <Text style={styles.dialogText}>Picture saved</Text>
            </DialogContent>
          </Dialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  subContainer: {
    height: '100%',
    width: '100%',
    paddingBottom: 70,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  downloadBtn: {
    color: 'rgb(255,255,255)',
    fontSize: 40,
  },
  dialogContainer: {
    alignItems: 'center',
    height: '20%',
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