import {
  FETCH_TOKEN_BY_ID_REQUEST,
  FETCH_TOKEN_BY_ID_SUCCESS,
  FETCH_TOKEN_BY_ID_FAIL,
} from '../actions/tokenAction';

const initialState = {
  loading: false,
  tokenInfo: {},
  error: null,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOKEN_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOKEN_BY_ID_SUCCESS:
      return {
        error: null,
        loading: false,
        tokenInfo: action.payload,
      };
    case FETCH_TOKEN_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tokenReducer;
