const initialState = {
  messages: [],
  error: null,
};

const chatReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_CHANGE': {
      console.log('Messages reducer payload, ', action.payload);
      return Object.assign({}, state, {
        log: action.payload,
      });
    }
    default: {
      return state;
    }
  }
};

export default chatReducer;
