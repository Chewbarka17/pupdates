import axios from 'axios';

export const getRooms = ownerId => (dispatch) => {
  axios.get(`https://serene-atoll-31576.herokuapp.com/api/rooms/${ownerId}`)
    .then(({ data }) => {
      dispatch({ type: 'GET_ROOMS_FULFILLED', payload: data });
    })
    .catch((err) => {
      dispatch({ type: 'GET_ROOMS_FULFILLED', payload: err });
    });
};

export const createRoom = (ownerIdOne, ownerIdTwo) => (dispatch) => {
  axios.post('https://serene-atoll-31576.herokuapp.com/api/rooms', {
    uids: [ownerIdOne, ownerIdTwo],
  })
    .then((response) => {
      dispatch({ type: 'POST_ROOM_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'POST_ROOM_REJECTED', payload: err });
    });
};
