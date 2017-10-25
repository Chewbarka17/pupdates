import axios from 'axios';

// gets all dogs; data: [{dog}, {dog}, {dog},...]
export const getAllUnseenDogs = (userid) => (dispatch) => {
  axios.get('http://localhost:8000/api/newdogs/' + userid)
    .then((data) => {
      console.log("data.data in actions: ", data.data);
      dispatch({type: 'FETCH_ALL_UNSEEN_DOGS_FULFILLED', payload: data.data}); 
    })
    .catch(err => {
      dispatch({type: 'FETCH_ALL_UNSEEN_DOGS_REJECTED', payload: err});
    });
};

// patch dogs to dogsSeen array; data: {user}
export const updateDogsSeen = (userid, dogid) => (dispatch) => {
  axios.patch('http://localhost:8000/api/users/seendogs/' + userid, {
    dogid: dogid
  })
  .then((data) => {
    dispatch({type: 'UPDATE_SEEN_DOGS_FULFILLED', payload: data[0].dogsSeen});
  })
  .catch(err => {
    dispatch({type: 'UPDATE_SEEN_DOGS_REJECTED', payload: err});
  });
};

// patch dogs to dogsLiked array; data: {user}
export const updateLikedDogs = (userid, dogid) => (dispatch) => {
  axios.patch('http://localhost:8000/api/users/likeddogs/' + userid, {
    dogid: dogid
  })
  .then((data) => {
    dispatch({type: 'UPDATE_LIKED_DOGS_FULFILLED', payload: data[0].dogsLiked});
  })
  .catch(err => {
    dispatc({type: 'UPDATE_LIKED_DOGS_REJECTED', payload: err});
  });
};