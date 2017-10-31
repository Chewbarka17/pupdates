import axios from 'axios';

export const getAllUnseenDogs = (userid) => (dispatch) => {
  axios.get('http://localhost:8000/api/newdogs/' + userid)
    .then((data) => {
      dispatch({type: 'FETCH_ALL_UNSEEN_DOGS_FULFILLED', payload: data.data});
    })
    .catch(err => {
      dispatch({type: 'FETCH_ALL_UNSEEN_DOGS_REJECTED', payload: err});
    });
};

export const updateDogsSeen = (userid, dogid) => (dispatch) => {
  axios.patch('http://localhost:8000/api/users/seendogs/' + userid, {
    dogid,
  })
  .then((data) => {
    dispatch({ type: 'UPDATE_SEEN_DOGS_FULFILLED', payload: data[0].dogsSeen });
  })
  .catch(err => {
    dispatch({type: 'UPDATE_SEEN_DOGS_REJECTED', payload: err});
  });
};

export const updateLikedDogs = (userid, dogid) => (dispatch) => {
  axios.patch('http://localhost:8000/api/users/likeddogs/' + userid, {
    dogid: dogid
  })
  .then((data) => {
    dispatch({type: 'UPDATE_LIKED_DOGS_FULFILLED', payload: data[0].dogsLiked});
  })
  .catch(err => {
    dispatch({type: 'UPDATE_LIKED_DOGS_REJECTED', payload: err});
  });
};