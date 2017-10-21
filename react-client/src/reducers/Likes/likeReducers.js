import action from '../../actions/Likes/likeActions';

const initialState = {
  dogs: [],
  fetched: false,
  deleted: false,
  error: null
}

const dogReducer = (state=initialState, action) => {
  console.log('what is actions', action);
  switch(action.type) {
    case 'FETCH_DOGS_LIKED_FULFILLED': {
      return Object.assign({}, state, {
        fetched: true,
        dogs: action.payload
      }); 
    }

    case 'FETCH_DOGS_LIKED_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload
      });
    }

    case 'FETCH_DOG_FULFILLED': {
      return Object.assign({}, state, {
        fetched: true,
        dogs: action.payload
      }) 
    }

    case 'FETCH_DOG_REJECTED': {
      return Object.assign({}, state, {
        error: action.payload
      });
    }

    case 'DELETE_DOG_REJECTED': {
      return Object.assign({}, state, {deleting: false, error: action.payload});
    }

    case 'DELETE_DOG_FULFILLED': {
      return Object.assign({}, state, {
        deleted: true,
        dogs: state.dogs.filter(dog => {
          return dog.id === Number(action.payload.id) ? null : dog; // dog.id (???)
        })
      })
    }
  }
  
  return state;
}

export default dogReducer; 