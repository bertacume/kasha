import { types } from '../actions/actions.js';

const reducers = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_PICTURES:
      console.log('reducer pictures', action.pictures);
      return {...state, pictures: action.pictures};

    default:
      return state;
  }
};

export default reducers;