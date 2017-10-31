const initialState = {
  rooms: [],
  error: null,
};

const chatRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'POST_ROOM_FULFILLED': {
      return Object.assign({}, state, {
        rooms: state.rooms.concat(action.payload),
        error: null,
      });
    }
    case 'POST_ROOM_REJCECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    case 'GET_ROOMS_FULFILLED': {
      return Object.assign({}, state, {
        rooms: action.payload,
        error: null,
      });
    }
    case 'GET_ROOMS_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload,
      });
    }
    default: {
      return state;
    }
  }
};

export default chatRoomReducer;
