import {combineReducers} from 'redux';
import APPSTATE from './appReducer';
import CART from './cartReducer';
import USER from './userReducer';
import NOTIFICATION from './notification';
export default combineReducers({
  USER,
  CART,
  NOTIFICATION,
  APPSTATE,
});
