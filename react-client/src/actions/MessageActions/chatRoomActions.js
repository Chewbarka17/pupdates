import axios from 'axios';

export const getRooms = userid => (dispatch) => {
  axios.get(`http://localhost:8000/api/rooms/${userid}`)
    .then(({ data }) => {
      console.log(data);
      dispatch({ type: 'SAVE_ROOMS', payload: data });
    })
    .catch((err) => {
      console.log('cdm can\'t get rooms', err);
    });
};

export const createRoom = (uid1, uid2) => (dispatch) => {
  axios.post('/api/rooms', {
    uids: [uid1, uid2],
  })
    .then((response) => {
      console.log(response)
      dispatch({ type: 'POST_ROOM_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'POST_ROOM_REJECTED', payload: err });
    });
};
