import actions from '../../actions/Profiles/dogProfileActions';

const initialState = {
  posted: false,
  fetched: false,
  dogs: [],
  dogsInfo: [],
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
    case 'LIST_DOGS': {
      return Object.assign({}, state, {
        dogInfo: state.dogsInfo.concat(action.payload),
      });
    }
    default:
      return state;
  }
};

export default dogReducer;
