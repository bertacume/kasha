import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { incrementPicIndex, setDevelopingAviable, fetchThumbnailPics } from '../../actions/actions';
import { PHOTOS_DIR, LIMIT_PICS } from '../../helpers/constants';


class CamScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    //Get camera permissions
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  
  takePicture = async () => {
    //check if it has already reached 36 pics
    //TODO: notif. you cant take more pics till you start developing
    if (!this.props.currentAlbum || this.props.picIndex >= LIMIT_PICS) return;
    
    //increment pic Index
    await this.props.incrementPicIndex();
  
    //set devAviable if pic Index === 36
    if (this.props.picIndex >= LIMIT_PICS) {
      this.props.setDevelopingAviable(true);
    }

    if (this.camera) {
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
        <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
          <View style={styles.content}>
            <View style={styles.bottomIcons}>
            <TouchableOpacity onPress={this.takePicture}>
              <MaterialCommunityIcons name="camera-iris" style={styles.takePicBtn} />
            </TouchableOpacity>
            </View>
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
    paddingHorizontal:10, 
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
  }
});