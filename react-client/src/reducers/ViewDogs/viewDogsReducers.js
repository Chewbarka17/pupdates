import action from '../../actions/ViewDogs/viewDogsActions';

const initialState = {
  unseenDogs: [],
  likedDogs: [],
  fetched: false,
  updated: false,
  error: null
}

const viewDogReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'FETCH_ALL_DOGS_FULFILLED': {
      return Object.assign({}, state, {

      }); 
    }

    case 'FETCH_ALL_DOGS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload
      });
    }

    case 'UPDATE_SEEN_DOGS_FULFILLED': {
      return Object.assign({}, state, {
        
      });
    }

    case 'UPDATE_SEEN_DOGS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload
      });
    }

    case 'UPDATE_LIKED_DOGS_FULFILLED': {
      return Object.assign({}, state, {
        
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