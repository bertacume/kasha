import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Camera, Permissions, FileSystem } from 'expo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { incrementPicIndex, setDevelopingAviable, fetchThumbnailPics } from '../../actions/actions';
import { PHOTOS_DIR, LIMIT_PICS } from '../../helpers/constants';
import Dialog, { DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';

const {height, width} = Dimensions.get('window');
const newWidth = height*(3/4);
const widthOffset = -((newWidth-width)/2);

class CamScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flashMode: 0,
    visibleOK: false,
    visible: false,
    dialogContent: '',
  };

  async componentWillMount() {
    //Get camera permissions
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  popDialogOK = () => {
    this.setState({ dialogContent: `No pictures left. Develop the film` });
    this.setState({ visibleOK: true });
  }

  takePicture = async () => {
    //check if it has already reached 36 pics
    //TODO: notif. you cant take more pics till you start developing
    if (!this.props.currentAlbum) {
      this.setState({ dialogContent: `Load a film` });
      this.setState({ visibleOK: true });
      // setTimeout(() => this.setState({ visible: false }), 4000);
      return;
    }
    if (this.props.picIndex >= LIMIT_PICS) {
      this.popDialogOK();
      return;
    }

    //increment pic Index
    await this.props.incrementPicIndex();

    if (this.camera) {
      let str = 'picture';
      if (LIMIT_PICS - this.props.picIndex !== 1) str += 's';
      this.setState({ dialogContent: `${LIMIT_PICS - this.props.picIndex} ${str} left` });
      this.setState({ visible: true });
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = async photo => {
    //save pic in currentAlbum directory
    const fileName = Date.now();
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${PHOTOS_DIR}${this.props.currentAlbum}/${fileName}.jpg`,
    });
    this.setState({ visible: false });

    //set devAviable if pic Index === 36
    if (this.props.picIndex >= LIMIT_PICS) {
      this.props.setDevelopingAviable(true);
    }

    //Save the pic if its the first one, in thumnail
    if (this.props.picIndex === 1) {
      const pic = {};
      pic[this.props.currentAlbum] = `${fileName}`;
      if (this.props.thumbnailPics && this.props.thumbnailPics.length) {
        this.props.fetchThumbnailPics([pic, ...this.props.thumbnailPics]);
      }
      else this.props.fetchThumbnailPics([pic]);
    }

  }

  renderCamera() {
    return (
      <Camera style={styles.camera} type={this.state.type} ref={ref => { this.camera = ref; }} flashMode={this.state.flashMode}>
        <View style={styles.content}>
        <Text></Text>
            
          <View style={styles.bottomIcons}>
            <TouchableOpacity onPress={() => {
              console.log('flashMode', Camera.Constants.FlashMode);
                 this.setState({
                   flashMode: this.state.flashMode === 1 ? 0 : 1
                 })
               }}>
              <Icon name='md-flash' size={40} color={'rgb(255, 255, 255)'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.takePicture}>
              <MaterialCommunityIcons name="camera-iris" style={styles.takePicBtn} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {
                 this.setState({
                   type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                 })
               }}>
              <Icon name='md-refresh' size={40} color={'rgb(255, 255, 255)'}/>
            </TouchableOpacity>
          </View>

          <Dialog
            visible={this.state.visible}
            // dialogTitle={<DialogTitle textStyle={styles.blueText} title='Winding the film' />}
            dialogStyle={styles.dialogContainer}
          >
            <DialogContent style={styles.dialogContent} >
              <Text style={styles.picsLeftText}>{this.state.dialogContent}</Text>
            </DialogContent>
          </Dialog>

          <Dialog
            visible={this.state.visibleOK}
            actions={[
              <DialogButton
                key={0}
                text='OK'
                onPress={() => this.setState({ visibleOK: false })}
                textStyle={styles.blueText}
              />
            ]}
            dialogStyle={styles.dialogContainer}
          >
            <DialogContent style={styles.dialogContent} >
              <Text style={styles.dialogText}>{this.state.dialogContent}</Text>
            </DialogContent>
          </Dialog>
        </View>
      </Camera>
    );
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View></View>
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return this.renderCamera();
    }
  }
}

const mapStateToProps = (state) => ({
  currentAlbum: state.currentAlbum,
  developingAlbum: state.developingAlbum,
  developingAviable: state.developingAviable,
  picIndex: state.picIndex,
  thumbnailPics: state.thumbnailPics,
  loadedFilms: state.loadedFilms,
});
const mapDispatchToProps = (dispatch) => ({
  incrementPicIndex: () => dispatch(incrementPicIndex()),
  setDevelopingAviable: (flag) => dispatch(setDevelopingAviable(flag)),
  fetchThumbnailPics: (pics) => dispatch(fetchThumbnailPics(pics)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CamScreen);

const styles = StyleSheet.create({
  camera: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 2,
    left: widthOffset, 
    right: widthOffset,
  },
  header: {
    backgroundColor: 'transparent',
    left: 0,
    top: 10,
    zIndex: 100,
    alignItems: 'center'
  },
  headerView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between'
  },
  text: {
    color: 'rgb(255,255,255)'
  },
  icon: {
    color: 'rgb(255,255,255)'
  },
  content: {
    paddingTop: 30,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  bottomIcons: {
    width: '100%',
    paddingHorizontal: 40 + widthOffset * (-1),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  takePicBtn: {
    color: 'rgb(255,255,255)',
    fontSize: 70
  },
  dialogContainer: {
    alignItems: 'center',
    height: '15%',
    width: '80%',
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
  picsLeftText: {
    paddingTop: 20,
    color: 'rgb(122, 168, 175)',
    fontFamily: 'Montserrat-ExtraBold',
    letterSpacing: 2,
    fontSize: 20,
  },
});