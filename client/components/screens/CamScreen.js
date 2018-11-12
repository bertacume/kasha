import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { incrementPicIndex, setDevelopingAviable, fetchThumbnailPics } from '../../actions/actions';
import { PHOTOS_DIR, LIMIT_PICS } from '../../helpers/constants';
import Dialog, { DialogButton, DialogContent, DialogTitle } from 'react-native-popup-dialog';


class CamScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
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
    this.setState({ dialogContent: `You reached ${LIMIT_PICS}, develop the film` });
    this.setState({ visibleOK: true });
  }

  takePicture = async () => {
    //check if it has already reached 36 pics
    //TODO: notif. you cant take more pics till you start developing
    if (!this.props.currentAlbum) {
      this.setState({ dialogContent: `You don't have any film loaded` });
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
      this.setState({ dialogContent: `${LIMIT_PICS - this.props.picIndex} left` });
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
      <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
        <View style={styles.content}>
          <View style={styles.bottomIcons}>
            <TouchableOpacity onPress={this.takePicture}>
              <MaterialCommunityIcons name="camera-iris" style={styles.takePicBtn} />
            </TouchableOpacity>
          </View>
          <Dialog
            visible={this.state.visible}
            dialogTitle={<DialogTitle textStyle={styles.blueText} title='Winding the film' />}
            dialogStyle={styles.dialogContainer}
          >
            <DialogContent style={styles.dialogContent} >
              <Text style={styles.dialogText}>{this.state.dialogContent}</Text>
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
});
const mapDispatchToProps = (dispatch) => ({
  incrementPicIndex: () => dispatch(incrementPicIndex()),
  setDevelopingAviable: (flag) => dispatch(setDevelopingAviable(flag)),
  fetchThumbnailPics: (pics) => dispatch(fetchThumbnailPics(pics)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CamScreen);

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 15,
    alignItems: 'flex-end'
  },
  bottomIcons: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  takePicBtn: {
    color: 'rgb(255,255,255)',
    fontSize: 70
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