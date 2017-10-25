import axios from 'axios';

export const postDogs = (name, age, breed, owner) => (dispatch) => {
  axios.post('http://localhost:8000/api/dogs', {
    name,
    age,
    breed,
    owner,
  })
    .then((response) => {
      dispatch({ type: 'POST_DOG_FULFILLED', payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: 'POST_DOG_REJECTED', payload: err });
    });
};

export const updateDogs = (name, age, breed, dogid) => (dispatch) => {
  axios.patch(`http://localhost:8000/api/dogs/${dogid}`, {
    name,
    age,
    breed,
  })
    .then((response) => {
      console.log('this is response.data', JSON.parse(response.config.data));
      dispatch({ type: 'UPDATE_DOG_FULFILLED', payload: { name, age, breed, dogid } });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_DOG_REJECTED', payload: err });
    });
};

export const deleteDogs = dogid => (dispatch) => {
  console.log(dogid);
  axios.delete(`http://localhost:8000/api/dogs/${dogid}`)
    .then(() => {
      dispatch({ type: 'DELETE_DOG_FULFILLED', payload: dogid });
    })
    .catch((err) => {
      dispatch({ type: 'DELETE_DOG_REJECTED', payload: err });
    });
};

// export const listDogs = dogInfo => (dispatch) => {
//   dispatch({ type: 'LIST_DOGS', payload: dogInfo });
// };
