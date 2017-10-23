import axios from 'axios';

// get request for all dogs 
export const getAllDogs = (userid) => {
  axios.get('http://localhost:8000/api/newdogs/' + userid)
}

// patch dogs to dogsSeen array
export const updateDogsSeen = (userid, dogid) => {
  axios.patch('http://localhost:8000/api/users/seendogs/' + userid, {
    dogid: dogid
  })
}










export function getDog() {
  return function(dispatch) {
    axios.get('http://localhost:8000/api/dogs/')
      .then(({ data }) => {
        console.log(data);
        dispatch({type: 'FETCH_ALL_DOGS_FULFILLED', payload: data});
      })
      .catch(err => { 
        dispatch({type: 'FETCH_ALL_DOGS_REJECTED', payload: err});
      });
  };
};