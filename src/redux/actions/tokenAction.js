// Action Type
export const FETCH_TOKEN_BY_ID_REQUEST = "FETCH_TOKEN_BY_ID_REQUEST";
export const FETCH_TOKEN_BY_ID_SUCCESS = "FETCH_TOKEN_BY_ID_SUCCESS";
export const FETCH_TOKEN_BY_ID_FAIL = "FETCH_TOKEN_BY_ID_FAIL";

// Action creators
export const fetchTokenByIdRequest = (id) => ({
  type: FETCH_TOKEN_BY_ID_REQUEST,
  payload: id,
});

export const fetchTokenByIdSuccess = (token) => ({
  type: FETCH_TOKEN_BY_ID_SUCCESS,
  payload: token,
});

export const fetchTokenByIdFail = (error) => ({
  type: FETCH_TOKEN_BY_ID_FAIL,
  payload: error,
});