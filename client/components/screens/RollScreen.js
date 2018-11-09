import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { fetchAlbums, renderAlbum } from '../../actions/actions';
import Icon from 'react-native-vector-icons/Ionicons';

class RollScreen extends Component {

  componentWillMount = async () => {
    
  };

  handlePress = (album) => {
    this.props.renderAlbum(album);
    this.props.navigation.navigate('Album');
  }

  renderAlbum = album => {
    const albumName = album.slice(0, album.lastIndexOf("_"));
    return <TouchableHighlight onPress={() => this.handlePress(album)} underlayColor="white">
      <View style={styles.row}>
        <Image source={{uri: 'https://static.wixstatic.com/media/2175dd_00a6e67d3bfc4af1ba9e9c423bd467f2~mv2.jpeg/v1/fill/w_808,h_354,al_c,q_80,usm_0.66_1.00_0.01/2175dd_00a6e67d3bfc4af1ba9e9c423bd467f2~mv2.jpeg'}} style={styles.thumbnail} />
        <Text style={styles.title}>{albumName}</Text>
        <Icon name='ios-arrow-forward' size={24} />
      </View>
      </TouchableHighlight>;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wraper}>
          <FlatList
            data={this.props.albums}
            extraData={this.state}
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
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbums: (albums) => dispatch(fetchAlbums(albums)),
  renderAlbum: (album) => dispatch(renderAlbum(album)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RollScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
  },
  wraper: {
    flex: 1,
    marginTop: 10,
    backgroundColor: 'rgb(255, 255, 255)',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  imageWrap: {
    margin: 2,
    padding: 2,
    height: (Dimensions.get('window').height / 5) - 12,
    width: (Dimensions.get('window').width / 3) - 4,
    backgroundColor: '#62686d'
  },
  row: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    // marginHorizontal: 15,
    // borderRadius:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e3e7ef',
  },
  thumbnail: {
    height: (Dimensions.get('window').height / 5) - 12,
    width: (Dimensions.get('window').width / 3) - 4,
    borderRadius:10
  },
  title: {
    color: 'rgb(255, 255, 255)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    paddingRight: 10
  }
});