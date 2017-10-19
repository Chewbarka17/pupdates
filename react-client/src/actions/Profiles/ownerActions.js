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

