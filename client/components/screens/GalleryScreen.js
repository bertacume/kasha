import React, { Component } from 'react';
import ImageList from '../presentational/ImageList';
import DevelopingList from '../presentational/DevelopingList';
import { connect } from 'react-redux';

class NewAlbumScreen extends Component {

  render() {
    if (this.props.renderAlbum === this.props.currentAlbum) {
      return (
        <DevelopingList album={this.props.renderAlbum} />
      );
    } else {
      return (
        <ImageList album={this.props.renderAlbum} />
      );
    }
  }
}


const mapStateToProps = (state) => ({
  renderAlbum: state.render_album,
  currentAlbum: state.current_album,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbumScreen);