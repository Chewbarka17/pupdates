import axios from 'axios';

export const postDogs = (name, age, breed, gender, bio, owner) => (dispatch) => {
  axios.post('http://localhost:8000/api/dogs', {
    name,
    age,
    breed,
    gender,
    bio,
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
      dispatch({ type: 'UPDATE_DOG_FULFILLED', payload: {
 name, age, breed, dogid 
} });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_DOG_REJECTED', payload: err });
    });
};

export const deleteDogs = (dogid, uid) => (dispatch) => {
  console.log(`http://localhost:8000/api/user/${uid}/dogs/${dogid}`);
  axios({
    method: 'delete',
    url: `http://localhost:8000/api/dogs/${dogid}`,
    data: {
      owner: uid,
      dogid,
    },
  })
    .then(() => {
      dispatch({ type: 'DELETE_DOG_FULFILLED', payload: dogid });
    })
    .catch((err) => {
      dispatch({ type: 'DELETE_DOG_REJECTED', payload: err });
    });

  // axios.delete(`http://localhost:8000/api/user/${uid}/dogs/${dogid}`, {data: {owner: uid, dogid: dogid}})
  //   .then(() => {
  //     dispatch({ type: 'DELETE_DOG_FULFILLED', payload: dogid });
  //   })
  //   .catch((err) => {
  //     dispatch({ type: 'DELETE_DOG_REJECTED', payload: err });
  //   });
};

// export const listDogs = dogInfo => (dispatch) => {
//   dispatch({ type: 'LIST_DOGS', payload: dogInfo });
// };
