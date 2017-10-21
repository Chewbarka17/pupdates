import { combineReducers } from 'redux';
import Dogs from './Profiles/dogReducers';
import Likes from './Likes/likeReducers';
import Rooms from './MessageReducers/ChatRoomReducers';
import Owners from './Profiles/ownerReducers';
// import user

const PupdatesReducers = combineReducers({
  Dogs,
  Likes,
  Rooms,
  Owners,
  // User,
});

export default PupdatesReducers;
