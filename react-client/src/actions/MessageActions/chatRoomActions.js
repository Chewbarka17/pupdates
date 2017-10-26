import axios from 'axios';

export const sendMessage = (message) => {
  return (dispatch) => {
    axios.patch('/messages' + message.roomid, {
      user: message.user,
      text: message.text,
      roomid: message.roomid,
    })
      .then((response) => {
        // something here needs fixing.  What is message?  what is response?
        console.log('MESSAGE CHANGE DISPATCH: ', response, message);
        dispatch({ type: 'MESSAGE_CHANGE', payload: message });
      });
  };
};

export const getRooms = (userid) => {
  return (dispatch) => {
    axios.get('http://localhost:8000/api/rooms/' + userid)
      .then(({ data }) => {
        // console.log(data);
        dispatch({ type: 'SAVE_ROOMS', payload: data });
      })
      .catch((err) => {
        console.log('cdm can\'t get rooms', err);
      });
  };
};

// export const saveRooms = (rooms) => {
//   return (dispatch) => {
//     dispatch({ type: 'SAVE_ROOMS', payload: rooms });
//   };
// };

export const createRoom = (uid1, uid2) => {
  return (dispatch) => {
    axios.post('/api/rooms', {
      uids: [uid1, uid2],
    })
      .then((response) => {
        dispatch({ type: 'POST_ROOM_FULFILLED', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'POST_ROOM_REJECTED', payload: err });
      });
  };
};
