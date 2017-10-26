import actions from '../../actions/Authentication/authActions';

const initialState = {
  fetched: false,
  posted: false,
  ownerInfo: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_OWNER_FROM_MONGO_FULFILLED': {
      return Object.assign({}, state, {
        fetched: true,
        ownerInfo: action.payload,
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
        ownerInfo: action.payload,
      });
    }
    case 'POST_OWNER_FROM_MONGO_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    default:
      return state;
  }
};

export default authReducer;
