import actions from '../../actions/Profiles/ownerActions';

const initialState = {
  posted: false,
  fetched: false,
  user: {},
  awsSauce: null,
  userLocation: {},
};

const ownerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_OWNER_FULFILLED': {
      return Object.assign({}, state, {
        fetched: true,
        user: action.payload,
      });
    }
    case 'FETCH_OWNER_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    // case 'POST_OWNER_FULFILLED': {
    //   console.log('owner reducer', action.payload)
    //   return Object.assign({}, state, {
    //     posted: true,
    //     user: action.payload,
    //   });
    // }
    // case 'POST_OWNER_REJECTED': {
    //   return Object.assign({}, state, {
    //     error: action.payload,
    //   });
    // }
    case 'UPDATE_OWNER_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    case 'UPDATE_OWNER_FULFILLED': {
      return Object.assign({}, state, {
        updated: true,
        user: action.payload,
      });
    }
    case 'GET_OWNER_FROM_MONGO_FULFILLED': {
      return Object.assign({}, state, {
        fetched: true,
        user: action.payload,
      });
    }
    case 'GET_OWNER_FROM_MONGO_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    case 'POST_OWNER_FROM_MONGO_FULFILLED': {
      return Object.assign({}, state, {
        posted: true,
        user: action.payload,
      });
    }
    case 'POST_OWNER_FROM_MONGO_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    case 'AWS_SECRET_SAUCE_FULFILLED': {
      return Object.assign({}, state, {
        posted: true,
        awsSauce: action.payload,
      });
    }
    default:
      return state;
  }
};

export default ownerReducer;
