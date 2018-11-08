import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
// import { Header, Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { fetchPictures } from '../../actions/actions';

const PHOTOS_DIR = FileSystem.documentDirectory + 'photos/uno';

class CamScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    focusedScreen: true
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async componentDidMount() {
    // FileSystem.deleteAsync(PHOTOS_DIR);
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos/uno').catch(e => {
      console.log(e, 'Directory UNO exists');
    });
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos/dos').catch(e => {
      console.log(e, 'Directory DOS exists');
    });
  }

  
  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = async photo => {
    console.log(photo);
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}photos/uno/${Date.now()}.jpg`,
    });
    const pics = await FileSystem.readDirectoryAsync(PHOTOS_DIR);
    this.props.fetchPictures(pics);
  }

  renderCamera() {
    return (
        <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref;}}>
          {/* <Header style={styles.header}>
            <View style={styles.headerView}>
              <Text style={styles.text}>Back</Text>
              <Text style={styles.text}>30/36</Text>
              <Icon name='ios-reverse-camera' size={32} style={styles.icon} onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                })
              }} />
            </View>
          </Header> */}
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
    const { hasCameraPermission, focusedScreen } = this.state;
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
  pictures: state.pictures,
});
const mapDispatchToProps = (dispatch) => ({
  fetchPictures: (pictures) => dispatch(fetchPictures(pictures))
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