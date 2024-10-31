import {
    FETCH_TOKEN_LIST_REQUEST,
    FETCH_TOKEN_LIST_SUCCESS,
    FETCH_TOKEN_LIST_FAIL,
  } from '../actions/tokenListAction';
  
  const initialState = {
    loading: false,
    tokenList: [],
    error: null,
  };
  
  const tokenListReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TOKEN_LIST_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_TOKEN_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          tokenList: action.payload,
        };
      case FETCH_TOKEN_LIST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default tokenListReducer;
  