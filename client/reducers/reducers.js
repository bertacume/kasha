import { types } from '../actions/actions.js';

const reducers = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PICTURES:
      console.log('reducer pictures', action.pictures);
      return {...state, pictures: action.pictures};

    case types.FETCH_ALBUMS:
      console.log('reducer albums', action.albums);
      return {...state, albums: action.albums};

    case types.UPDATE_CURRENT_ALBUM:
      console.log('reducer current album', action.current_album);
      return {...state, current_album: action.current_album};

    default:
      return state;
  }
};

export default reducers;