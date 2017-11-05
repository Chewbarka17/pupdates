import action from '../../actions/Profiles/dogProfileActions';

const initialState = {
  posted: false,
  fetched: false,
  updated: false,
  dogs: [],
  dogInfo: {
    age: '',
    bio: '',
    breed: '',
    gender: '',
    name: '',
    owner: '',
    pictures: [],
  },
};

const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DOG_FULFILLED': {
      return Object.assign({}, state, {
        fetched: true,
        dogs: state.dogs.concat(action.payload),
      });
    }
    case 'FETCH_DOG_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
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
    case 'UPDATE_DOG_FULFILLED': {
      return Object.assign({}, state, {
        updated: true,
        dogInfo: action.payload,
        dogs: state.dogs.filter((dog) => {
          return dog._id !== action.payload._id;
        }).concat(action.payload),
      });
    }
    case 'UPDATE_DOG_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
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
        deleted: false,
        error: action.payload,
      });
    }
    case 'SHOW_DOG': {
      return Object.assign({}, state, {
        dogInfo: action.payload,
      });
    }
    case 'FETCH_OWNERS_DOGS_FULFILLED': {
      return Object.assign({}, state, {
        dogs: action.payload,
      });
    }
    case 'FETCH_OWNERS_DOGS_FAILED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    default:
      return state;
  }
};

export default dogReducer;
