import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { fetchAlbums, renderAlbum } from '../../actions/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { PHOTOS_DIR } from '../../helpers/constants';

class RollScreen extends Component {
    handlePress = (album) => {
    this.props.renderAlbum(album);
    this.props.navigation.navigate('Album');
  }

  renderAlbum = album => {
    const albumName = album.slice(0, album.lastIndexOf("_"));
    let thPic = null;
    this.props.thumbnailPics.forEach(obj => {
      if (obj[album]) thPic = obj[album];
    });
    return (<TouchableHighlight onPress={() => this.handlePress(album)} underlayColor="white" style={styles.rowContainer}>
      <View style={styles.row} >
        {thPic && <Image source={{ uri: `${PHOTOS_DIR}${album}/${thPic}` }} style={styles.thumbnail} blurRadius={2} />}
        <View style={styles.alNameCont}>
          <Icon name='md-folder' size={20} color={'rgba(255, 255, 255, .4)'} style={styles.icon} />
          <Text style={styles.titleBasic}>{albumName}</Text>
        </View>
      </View>
    </TouchableHighlight>

    );
  }

  renderTitle = () => {
     setTimeout(() => {
      return (<View>
          <Text style={styles.title}>{('Developed Films').toUpperCase()}</Text>
      </View>
      );
    }, 1000);
  }

  render() {
    const albums = this.props.albums.filter(album => album !== this.props.currentAlbum && album !== this.props.developingAlbum);
    let albumName = '';
    let albumDevName = '';
    this.props.currentAlbum ? albumName = this.props.currentAlbum.slice(0, this.props.currentAlbum.lastIndexOf("_")) : null;
    this.props.developingAlbum ? albumDevName = this.props.developingAlbum.slice(0, this.props.developingAlbum.lastIndexOf("_")) : null;
    return (
      <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={require('../../assets/bg-reversed.jpg')} style={styles.backgroundImage} />
        {(this.props.currentAlbum) &&
          <TouchableHighlight onPress={() => this.handlePress(this.props.currentAlbum)} underlayColor="white" style={styles.filmContainer}>
            <View style={styles.rowCurrentAlbum} >
              <Image source={require('../../assets/film.png')} style={styles.rollThumbnail} />
              <View style={styles.textsView}>
                <Text style={styles.title}>{albumName.toUpperCase()}</Text>
                <Text style={styles.subTitle}>Loaded Film</Text>
              </View>
              <Icon name='ios-arrow-forward' size={24} color={'#006e6c'} style={styles.icon} />
            </View>
          </TouchableHighlight>
        }
        {(this.props.developingAlbum) &&
          <TouchableHighlight onPress={() => this.handlePress(this.props.developingAlbum)} underlayColor="white" style={styles.filmContainer}>
            <View style={styles.rowCurrentAlbum} >
              <Image source={require('../../assets/film-dev.png')} style={styles.rollThumbnail} />
              <View style={styles.textsView}>
                <Text style={styles.title}>{albumDevName.toUpperCase()}</Text>
                <Text style={styles.subTitle}>Developing...</Text>
              </View>
              <Icon name='ios-arrow-forward' size={24} color={'#006e6c'} style={styles.icon} />
            </View>
          </TouchableHighlight>
        }
        {this.props.fontsLoaded && <View style={styles.titleGalleryWrapper}>
          <Text style={styles.galleryText}>{('Developed Films').toUpperCase()}</Text>
          <Icon name='ios-arrow-down' size={24} color={'rgb(255, 255, 255)'}/>
          </View>}       
          {this.props.fontsLoaded && albums && !albums.length && <Text style={styles.subTitleAlbums}>{('No films yet').toUpperCase()}</Text>}
        <View style={styles.wraperRolls}>
          <FlatList
            numColumns={2}
            data={albums}
            extraData={this.props}
            keyExtractor={(item, index) => item}
            renderItem={({ item, separators }) => this.renderAlbum(item)}
          />
        </View>
      </View>
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
  albums: state.albums,
  currentAlbum: state.currentAlbum,
  developingAlbum: state.developingAlbum,
  thumbnailPics: state.thumbnailPics,
  fontsLoaded: state.fontsLoaded,
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
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    paddingTop: 25,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  wraperRolls: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 2,
  },
  alNameCont: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .4)',
  },
  albumNameContainer: {
    flex: 1,
    padding: 10,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  rowCurrentAlbum: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rollThumbnail: {
    marginHorizontal: 10,
    height: '70%',
    width: '25%',
    resizeMode: 'contain',
  },
  rowContainer: {
    marginHorizontal: 4,
    height: (Dimensions.get('window').height / 5),
    width: (Dimensions.get('window').width / 2 - 8),
  },
  filmContainer: {
    marginVertical: 5,
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').height / 5),
    backgroundColor: 'rgba(255, 255, 255, .5)',
  },
  subTitle: {
    color: '#006e6c',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  subTitleAlbums: {
    color: '#006e6c',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
    padding: 10,
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
  },
  titleBasic: {
    color: '#006e6c',
    fontFamily: 'Montserrat-Regular',
    letterSpacing: 2,
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
  galleryText: {
    color: 'rgb(255, 255, 255)',
    fontFamily: 'Montserrat-Regular',
    letterSpacing: 2,
    marginRight: 10,
  },
  titleGalleryWrapper: {
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }
});