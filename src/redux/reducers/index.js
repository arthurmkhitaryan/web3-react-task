import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import tokenListReducer from './tokenListReducer';
import swapTransactionReducer from './fetchSwapTransactionReducer';

const rootReducer = combineReducers({
  tokenReducer, // Add your reducers here
  tokenListReducer,
  swapTransactionReducer
});

export default rootReducer;