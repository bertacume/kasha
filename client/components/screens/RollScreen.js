import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { fetchAlbums, renderAlbum } from '../../actions/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { PHOTOS_DIR } from '../../helpers/constants';
const thumbPics = [

];


class RollScreen extends Component {
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
    let thPic = null;
    this.props.thumbnailPics.forEach(obj => {
      console.log(obj, album);
      if (obj[album]) thPic = obj[album];
    });
    return (<TouchableHighlight onPress={() => this.handlePress(album)} underlayColor="white" style={styles.rowContainer}>
      <View style={styles.row} >
          {thPic && <Image source={{uri: `${PHOTOS_DIR}${album}/${thPic}`}} style={styles.thumbnail} blurRadius={2} />}
            <Text style={styles.titleBasic}>{albumName}</Text>
          <Icon name='ios-arrow-forward' size={24} color={'#006e6c'} style={styles.icon} />
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
  thumbnailPics: state.thumbnailPics,
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