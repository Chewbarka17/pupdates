import axios from 'axios';

// export const postDogs = (name, age, breed, gender, bio, owner, picture, callback) => (dispatch) => {
export const postDogs = (name, age, breed, gender, bio, owner, picture, callback) => (dispatch) => {
  axios.post('http://localhost:8000/api/dogs', {
    name,
    age,
    breed,
    gender,
    bio,
    owner,
    picture,
  })
    .then((response) => {
      dispatch({ type: 'POST_DOG_FULFILLED', payload: response.data });
      callback(response.data);
    })
    .catch((err) => {
      dispatch({ type: 'POST_DOG_REJECTED', payload: err });
    });
};

export const updateDogs = (name, age, breed, dogid, picture, data) => (dispatch) => {
  axios.patch(`http://localhost:8000/api/dogs/${dogid}`, {
    name,
    age,
    breed,
    picture,
  })
    .then((response) => {
      // console.log('this is response.data', JSON.parse(response.config.data));
      let dog = JSON.parse(response.config.data);
      
      data.name = dog.name;
      data.age = dog.age;
      data.breed = dog.breed;
      data.pictures[0] = dog.picture;
      
      dispatch({ type: 'UPDATE_DOG_FULFILLED', payload: data });
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
