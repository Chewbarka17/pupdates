import axios from 'axios';

export const postOwners = (firstname, lastname, age, zipcode, bio) => (dispatch) => {
  axios.post('http://localhost:8000/api/users', {
    name: `${firstname}  ${lastname}`,
    age,
    location: zipcode,
    bio,
    picture: 'google.com',
    rating: 4,
  })
    .then((response) => {
      dispatch({ type: 'POST_OWNER_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'POST_OWNER_REJECTED', payload: err });
    });
};

export const updateOwners = (firstname, lastname, age, zipcode, bio, userid) => (dispatch) => {
  axios.patch(`http://localhost:8000/api/users/ + ${userid}`, {
    name: `${firstname}  ${lastname}`,
    age,
    location: zipcode,
    bio,
    picture: 'google.com', // to be changed
    rating: 4, // to be changed
  })
    .then((response) => {
      dispatch({ type: 'POST_OWNER_FULFILLED', payload: response.data[1] });
    })
    .catch((err) => {
      dispatch({ type: 'POST_OWNER_REJECTED', payload: err });
    });
};

