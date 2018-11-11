import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { fetchAlbums, renderAlbum } from '../../actions/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { PHOTOS_DIR } from '../../helpers/constants';


class RollScreen extends Component {

  componentWillMount = async () => {

  };

  handlePress = (album) => {
    this.props.renderAlbum(album);
    this.props.navigation.navigate('Album');
  }

  renderAlbum = album => {
    const albumName = album.slice(0, album.lastIndexOf("_"));
    if (this.props.developingAlbum === album) {
      return (<TouchableHighlight onPress={() => this.handlePress(album)} underlayColor="white" style={styles.rowContainer}>
        <View style={styles.rowCurrentAlbum} >
          <Image source={require('../../assets/film-dev.png')} style={styles.rollThumbnail} />
          <View style={styles.textsView}>
            <Text style={styles.title}>{albumName.toUpperCase()}</Text>
            <Text style={styles.subTitle}>Developing...</Text>
          </View>
          <Icon name='ios-arrow-forward' size={24} color={'#006e6c'} style={styles.icon} />
        </View>
      </TouchableHighlight>

      );
    };
    if (this.props.currentAlbum === album) {
      return ( <TouchableHighlight onPress={() => this.handlePress(album)} underlayColor="white" style={styles.rowContainer}>
        <View style={styles.rowCurrentAlbum} >
          <Image source={require('../../assets/film.png')} style={styles.rollThumbnail} />
          <View style={styles.textsView}>
            <Text style={styles.title}>{albumName.toUpperCase()}</Text>
            <Text style={styles.subTitle}>Mounted Film</Text>
          </View>
          <Icon name='ios-arrow-forward' size={24} color={'#006e6c'} style={styles.icon} />
        </View>
      </TouchableHighlight>
      );
    } 
    // const pics = await FileSystem.readDirectoryAsync(PHOTOS_DIR + this.props.album);
    return (<TouchableHighlight onPress={() => this.handlePress(album)} underlayColor="white" style={styles.rowContainer}>
      <View style={styles.row} >
          <Image source={{ uri: 'https://static.wixstatic.com/media/2175dd_00a6e67d3bfc4af1ba9e9c423bd467f2~mv2.jpeg/v1/fill/w_808,h_354,al_c,q_80,usm_0.66_1.00_0.01/2175dd_00a6e67d3bfc4af1ba9e9c423bd467f2~mv2.jpeg' }} style={styles.thumbnail} blurRadius={2} />
          {/* <View style={styles.titleContainer}> */}
            <Text style={styles.titleBasic}>{albumName}</Text>
          {/* </View> */}
          <Icon name='ios-arrow-forward' size={24} color={'#006e6c'} style={styles.icon} />

          {/* {`${PHOTOS_DIR}${this.props.album}/${fileName}`}  */}
        </View>
    </TouchableHighlight>

    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/bg-reversed.jpg')} style={styles.backgroundImage} />
        <View style={styles.wraper}>
          <FlatList
            data={this.props.albums}
            extraData={this.props.developingAlbum}
            keyExtractor={(item, index) => item}
            renderItem={({ item, separators }) => this.renderAlbum(item)}
          />
        </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  albums: state.albums,
  currentAlbum: state.currentAlbum,
  developingAlbum: state.developingAlbum,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbums: (albums) => dispatch(fetchAlbums(albums)),
  renderAlbum: (album) => dispatch(renderAlbum(album)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RollScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  wraper: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  thumbnail: {
    height: '100%',
    width: (Dimensions.get('window').width) * 0.3,
    resizeMode: 'cover',
    borderColor: 'rgba(255, 255, 255, .4)',
    borderWidth: 6,
  },
  rowCurrentAlbum: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderColor: 'rgb(255, 255, 255)',
    // borderBottomWidth: 4,    
  },
  rollThumbnail: {
    marginHorizontal: 10,
    height: '70%',
    width: '25%',
    resizeMode: 'contain',
  },
  rowContainer: {
    marginVertical: 5,
    height: (Dimensions.get('window').height / 5),
    backgroundColor: 'rgba(255, 255, 255, .5)',
  },
  subTitle: {
    color: 'rgb(255, 255, 255)',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  titleContainer: {
    height: '100%',
    width: '20%',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    color: '#006e6c',
    fontFamily: 'Montserrat-ExtraBold',
    letterSpacing: 2,
    // paddingRight: 10,
  },
  titleBasic: {
    color: '#006e6c',
    fontFamily: 'Montserrat-Regular',
    letterSpacing: 2,
    // paddingRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  textsView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});