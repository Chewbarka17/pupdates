import axios from 'axios';

export const messageChange = (messages) => {
  return (dispatch) => {
    console.log('MESSAGE CHANGE DISPATCH: ', messages);
    dispatch({ type: 'MESSAGE_CHANGE', payload: messages });
  };
};

export const getRooms = () => {
  // axios.get('/api/rooms')
};

export const createRoom = (uid1, uid2) => {
  axios.post('/api/rooms', {
    uids: [uid1, uid2],
  })
    .then((response) => {
      dispatch({ type: 'POST_ROOM_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'POST_OWNER_REJECTED', payload: err });
    });
};
