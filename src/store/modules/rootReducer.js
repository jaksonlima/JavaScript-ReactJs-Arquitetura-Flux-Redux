import { combineReducers } from 'redux';

import cart from './cart/reducer';
import home from './home/reducer';

export default combineReducers({
  cart,
  home,
});
