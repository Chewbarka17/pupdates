import action from '../../actions/Profiles/dogProfileActions';

const initialState = {
  posted: false,
  fetched: false,
  dogs: [],
  dogInfo: [],
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DOG_FULFILLED': {
      return Object.assign({}, state, {
        fetched: true,
        dog: action.payload,
      });
    }
    case 'FETCH_OWNER_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    case 'POST_DOG_FULFILLED': {
      return Object.assign({}, state, {
        posted: true,
        dogs: state.dogs.concat(action.payload),
      });
    }
    case 'POST_DOG_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    case 'UPDATE_DOG_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    case 'UPDATE_DOG_FULFILLED': {
      return Object.assign({}, state, {
        updated: true,
        user: state.dogs.filter((dog) => {
          console.log('what is action.payload', dog);
          dog._id === action.payload.dogid ? action.payload : dog;
        }),
      });
    }
    case 'DELETE_DOG_FULFILLED': {
      return Object.assign({}, state, {
        deleted: true,
        dogs: state.dogs.filter(dog => (dog._id !== action.payload ? dog : null)),
      });
    }
    case 'DELETE_DOG_REJECTED': {
      return Object.assign({}, state, {
        deleting: false,
        error: action.payload,
      });
    }
    default:
      return state;
  }
};

export default dogReducer;
