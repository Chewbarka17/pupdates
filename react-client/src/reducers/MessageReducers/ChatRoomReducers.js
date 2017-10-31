const initialState = {
  rooms: [],
  error: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_ROOM_FULFILLED': {
      // console.log('Messages reducer payload, ', action.payload);
      return Object.assign({}, state, {
        rooms: state.rooms.concat(action.payload),
      });
    }
    case 'POST_ROOM_REJCECTED': {
      // console.log('Messages reducer payload, ', action.payload);
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    case 'GET_ROOMS_ FULFILLED': {
      return Object.assign({}, state, {
        rooms: action.payload,
      });
    }
    default: {
      return state;
    }
  }
};

export default chatReducer;
