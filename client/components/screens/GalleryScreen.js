import React, { Component } from 'react';
import ImageList from '../container/ImageList';
import { connect } from 'react-redux';

class NewAlbumScreen extends Component {

  render() {
    return (
      <ImageList album={this.props.renderAlbum} />
    );
  }
}


const mapStateToProps = (state) => ({
  pictures: state.pictures,
  renderAlbum: state.render_album,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbumScreen);