import { types } from '../actions/actionTypes';

const initialState = {
  fontsLoaded: false,
  albums: [],
  thumbnailPics: [],
  currentAlbum: false,
  developingAlbum: false,
  developingAviable: false,
  expirationDate: false,
  renderAlbum: false,
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case types.FONTS_LOADED:
    return {...state, fontsLoaded: action.fontsLoaded};
    case types.FETCH_ALBUMS:
      console.log('reducer albums', action.albums);
      const albums = action.albums;
      albums.sort((a,b) => {
        const aAlbum = a.slice(a.lastIndexOf("_") + 1);
        const bAlbum = b.slice(b.lastIndexOf("_") + 1);
        return bAlbum - aAlbum;
      });
      return {...state, albums: albums};

    case types.FETCH_THUMBNAIL_PICS:
      console.log('reducer thumbnailPics', action.thumbnailPics);
      return {...state, thumbnailPics: action.thumbnailPics};

    case types.UPDATE_CURRENT_ALBUM:
      console.log('reducer current album', action.currentAlbum);
      return {...state, currentAlbum: action.currentAlbum};

    case types.UPDATE_DEVELOPING_ALBUM:
      console.log('reducer dev album', action.developingAlbum);
      return {...state, developingAlbum: action.developingAlbum};

    case types.SET_DEVELOPING_AVIABLE:
      console.log('reducer set developingAviable', action.developingAviable);
      return {...state, developingAviable: action.developingAviable};

    case types.RENDER_ALBUM:
      console.log('reducer render album', action.renderAlbum);
      return {...state, renderAlbum: action.renderAlbum};

    case types.SET_PIC_INDEX:
      console.log('reducer set picIndex', action.picIndex);
      console.log(state);
      return {...state, picIndex: action.picIndex};
      
      case types.INCREMENT_PIC_INDEX:
      console.log('reducer picIndex', state.picIndex + 1);
      return {...state, picIndex: state.picIndex + 1};
      
      case types.SET_EXPIRATION_DATE:
        console.log('reducer set expirationDate', action.expirationDate);
        return {...state, expirationDate: action.expirationDate};
      
    default:
      return state;
  }
};

export default reducers;