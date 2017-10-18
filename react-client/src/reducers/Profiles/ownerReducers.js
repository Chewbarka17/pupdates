const initialState = {
  posted: false,
  fetched: false,
  user: [],
};

const ownerReducers = (state = initialState, action) => {
  switch (actions.type) {
    case 'FETCH_OWNERS_FULFILLED': {
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
    case 'POST_OWNERS_FULFILLED': {
      return Object.assign({}, state, {
        posted: true,
        user: action.payload,
      });
    }
    case 'POST_OWNERS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
  }
  return state;
};

export default ownerReducers;
