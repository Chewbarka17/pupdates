// import action from '../../actions/ViewDogs/viewDogsActions';

const initialState = {
  unseenDogs: [],
  distance: 0,
  error: null,
};

const viewDogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ALL_UNSEEN_DOGS_FULFILLED': {
      return Object.assign({}, state, {
        distance: action.payload[1],
        unseenDogs: action.payload[0],
      });
    }

    case 'FETCH_ALL_UNSEEN_DOGS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }

    case 'UPDATE_DISTANCE_TO_DOG': {
      return Object.assign({}, state, {
        distance: action.payload,
      });
    }

    case 'FIND_DISTANCE_FAILED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }

    case 'UPDATE_SEEN_DOGS_FULFILLED': {
      return Object.assign({}, state, {
        unseenDogs: state.unseenDogs.filter(dog => dog._id !== action.payload),
      });
    }

    case 'UPDATE_SEEN_DOGS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }

    case 'UPDATE_LIKED_DOGS_FULFILLED': {
      return Object.assign({}, state, {
        // likedUpdated: true,
        unseenDogs: state.unseenDogs.filter(dog => dog._id !== action.payload),
      });
    }

    case 'UPDATE_LIKED_DOGS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    default:
      return state;
  }
};

export default viewDogReducer;
