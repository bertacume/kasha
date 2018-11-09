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

    case types.UPDATE_DEVELOPING_ALBUM:
      console.log('reducer dev album', action.developingAlbum);
      return {...state, developingAlbum: action.developingAlbum};

    case types.SET_DEVELOPING_AVIABLE:
      console.log('reducer set developingAviable', action.developingAviable);
      return {...state, developingAviable: action.developingAviable};

    case types.RENDER_ALBUM:
      console.log('reducer render album', action.render_album);
      return {...state, render_album: action.render_album};

    case types.SET_PIC_INDEX:
      console.log('reducer set picIndex', action.picIndex);
      return {...state, picIndex: action.picIndex};

    case types.INCREMENT_PIC_INDEX:
      console.log('reducer picIndex', state.picIndex);
      return {...state, picIndex: state.picIndex + 1};

    default:
      return state;
  }
};

export default reducers;