import React, { Component } from 'react';
import ImageList from '../presentational/ImageList';
import DevelopingList from '../presentational/DevelopingList';
import { connect } from 'react-redux';

class NewAlbumScreen extends Component {

  render() {
    return (this.props.renderAlbum === this.props.currentAlbum || this.props.renderAlbum === this.props.developingAlbum) 
         ? <DevelopingList album={this.props.renderAlbum} navigation={this.props.navigation} />
         : <ImageList album={this.props.renderAlbum} navigation={this.props.navigation} />
  }
}

const mapStateToProps = (state) => ({
  renderAlbum: state.renderAlbum,
  currentAlbum: state.currentAlbum,
  developingAlbum: state.developingAlbum,
});

const mapDispatchToProps = (dispatch) => ({
  updateDevelopingAlbum: (album) => dispatch(updateDevelopingAlbum(album)),
  setExpirationDate: (date) => dispatch(setExpirationDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbumScreen);