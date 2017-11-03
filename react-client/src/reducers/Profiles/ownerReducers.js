// import actions from '../../actions/Profiles/ownerActions';

const initialState = {
  loggedIn: false,
  user: {},
  awsSauce: null,
  userLocation: {},
};

const ownerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_OWNER_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    case 'UPDATE_OWNER_FULFILLED': {
      return Object.assign({}, state, {
        user: action.payload,
      });
    }
    case 'GET_OWNER_FROM_MONGO_FULFILLED': {
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.payload,
      });
    }
    case 'GET_OWNER_FROM_MONGO_REJECTED': {
      return Object.assign({}, state, {
        loggedIn: false,        
        error: action.payload,
      });
    }
    case 'POST_OWNER_FROM_MONGO_FULFILLED': {
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.payload,
      });
    }
    case 'POST_OWNER_FROM_MONGO_REJECTED': {
      return Object.assign({}, state, {
        loggedIn: false,        
        error: action.payload,
      });
    }
    case 'OWNER_LOGGED_OUT_FULFILLED': {
      return Object.assign({}, state, {
        loggedIn: action.payload,
      });
    }
    case 'OWNER_LOGGED_OUT_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    case 'AWS_SECRET_SAUCE_FULFILLED': {
      return Object.assign({}, state, {
        awsSauce: action.payload,
      });
    }
    default:
      return state;
  }
};

export default ownerReducer;
