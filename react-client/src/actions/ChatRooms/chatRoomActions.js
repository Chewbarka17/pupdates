import axios from 'axios';

export const getRooms = userid => (dispatch) => {
  axios.get(`http://localhost:8000/api/rooms/${userid}`)
    .then(({ data }) => {
      dispatch({ type: 'GET_ROOMS_FULFILLED', payload: data });
    })
    .catch((err) => {
      dispatch({ type: 'GET_ROOMS_FULFILLED', payload: err });
    });
};

export const createRoom = (uid1, uid2) => (dispatch) => {
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
