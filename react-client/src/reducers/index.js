import { combineReducers } from 'redux';
import Dogs from './Profiles/dogReducers';
import Likes from './Likes/likeReducers';
import Rooms from './MessageReducers/ChatRoomReducers';
import Owners from './Profiles/ownerReducers';
import Auth from './Authentication/authReducers';

const PupdatesReducers = combineReducers({
  Dogs,
  Likes,
  Rooms,
  Owners,
  Auth,
});

export default PupdatesReducers;
