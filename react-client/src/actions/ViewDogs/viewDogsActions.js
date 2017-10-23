import axios from 'axios';

// get request for all dogs for specific user
export const getAllDogs = (userid) => {
  axios.get('http://localhost:8000/api/newdogs/' + userid)
    .then((data) => {
      dispatch({type: 'FETCH_ALL_DOGS_FULFILLED', payload: data});
    })
    .catch(err => {
      dispatch({type: 'FETCH_ALL_DOGS_REJECTED', payload: err});
    });
};

// patch dogs to dogsSeen array
export const updateDogsSeen = (userid, dogid) => {
  axios.patch('http://localhost:8000/api/users/seendogs/' + userid, {
    dogid: dogid
  })
  .then((data) => {
    dispatch({type: 'UPDATE_SEEN_DOGS_FULFILLED', payload: data});
  })
  .catch(err => {
    dispatch({type: 'UPDATE_SEEN_DOGS_REJECTED', payload: err});
  });
};

// patch dogs to dogsLiked array
export const updateLikedDogs = (userid, dogid) => {
  axios.patch('http://localhost:8000/api/users/likeddogs/' + userid, {
    dogid: dogid
  })
  .then((data) => {
    dispatch({type: 'UPDATE_LIKED_DOGS_FULFILLED', payload: data});
  })
  .catch(err => {
    dispatc({type: 'UPDATE_LIKED_DOGS_REJECTED', payload: err});
  });
};