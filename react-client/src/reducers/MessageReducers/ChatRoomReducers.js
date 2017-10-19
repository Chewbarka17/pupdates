const initialState = {
  rooms: [],
  error: null,
};

const chatReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_CHANGE': {
      // console.log('Messages reducer payload, ', action.payload);
      return Object.assign({}, state, {
        // log: action.payload,
      });
    }
    case 'POST_ROOM_FULFILLED': {
      // console.log('Messages reducer payload, ', action.payload);
      return Object.assign({}, state, {
        rooms: state.rooms.concat(action.payload),
      });
    }
    default: {
      return state;
    }
  }
};

export default chatReducer;
