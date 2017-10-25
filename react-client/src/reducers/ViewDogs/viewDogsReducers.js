import action from '../../actions/ViewDogs/viewDogsActions';

const initialState = {
  unseenDogs: [],
  likedDogs: [],
  seenDogs: [],
  fetched: false,
  seenUpdated: false,
  likedUpdated: false,
  error: null
}

const viewDogReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'FETCH_ALL_UNSEEN_DOGS_FULFILLED': {
      return Object.assign({}, state, {
        fetched: true,
        unseenDogs: action.payload
      }); 
    }

    case 'FETCH_ALL_UNSEEN_DOGS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload
      });
    }

    case 'UPDATE_SEEN_DOGS_FULFILLED': {
      return Object.assign({}, state, {
        seenUpdated: true,
        seenDogs: action.payload
      });
    }

    case 'UPDATE_SEEN_DOGS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload
      });
    }

    case 'UPDATE_LIKED_DOGS_FULFILLED': {
      return Object.assign({}, state, {
        likedUpdated: true,
        likedDogs: action.payload
      });
    }

    case 'UPDATE_LIKED_DOGS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload
      });
    }
  }
  return state;
}

export default viewDogReducer; 