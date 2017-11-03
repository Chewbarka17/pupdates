import axios from 'axios';

// get liked dogs' IDs of a specific user
export const getAllLikedDogs = (userid) => {
  axios.get(`https://serene-atoll-31576.herokuapp.com/api/likeddogs/${userid}`)
    .then((data) => {
      dispatch({ type: 'FETCH_LIKED_DOGS_FULFILLED', payload: data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_LIKED_DOGS_REJECTED', payload: err });
    });
};

// delete dog from user's likedDogs array
export const deleteLikedDog = (userid, dogid) => {
  axios.patch(`https://serene-atoll-31576.herokuapp.com/api/likeddogs/${userid}`, {
    dogid,
  })
    .then((data) => {
      dispatch({ type: 'REMOVE_LIKED_DOGS_FULFILLED', payload: data });
    })
    .catch((err) => {
      dispatch({ type: 'REMOVE_LIKE_DOGS_REJECTED', payload: err });
    });
};
