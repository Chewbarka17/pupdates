import axios from 'axios';

export const postOwners = (name, age, location, bio) => (dispatch) => {
  console.log('axios post', typeof age, age);
  axios.post('http://localhost:8000/api/users', {
    name,
    age,
    location,
    bio,
    picture: 'google.com',
    rating: 4,
  })
    .then((response) => {
      console.log('owner action', typeof response.data.age);
      dispatch({ type: 'POST_OWNER_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'POST_OWNER_REJECTED', payload: err });
    });
};

export const updateOwners = (name, age, location, bio, userid) => (dispatch) => {
  axios.patch(`http://localhost:8000/api/users/ + ${userid}`, {
    name,
    age,
    location,
    bio,
    picture: 'google.com', // to be changed
    rating: 4, // to be changed
  })
    .then((response) => {
      dispatch({ type: 'UPDATE_OWNER_FULFILLED', payload: response.data[1] });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_OWNER_REJECTED', payload: err });
    });
};

