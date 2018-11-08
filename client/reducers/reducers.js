import { types } from '../actions/actions.js';

const reducers = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_ALBUMS:
      console.log('reducer albums', action.albums);
      const albums = action.albums;
      albums.sort((a,b) => {
        const aAlbum = a.slice(a.lastIndexOf("_") + 1);
        const bAlbum = b.slice(b.lastIndexOf("_") + 1);
        return bAlbum - aAlbum;
      });
      return {...state, albums: albums};

    case types.UPDATE_CURRENT_ALBUM:
      console.log('reducer current album', action.current_album);
      return {...state, current_album: action.current_album};

    case types.RENDER_ALBUM:
      console.log('reducer render album', action.render_album);
      return {...state, render_album: action.render_album};

    default:
      return state;
  }
};

export default reducers;