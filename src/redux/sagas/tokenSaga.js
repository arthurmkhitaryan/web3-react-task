import { put, takeLatest, call } from "redux-saga/effects";
import { getData } from "../../utils/api";
import {
  FETCH_TOKEN_LIST_REQUEST,
  fetchTokenListSuccess,
  fetchTokenListFail,
} from "../actions/tokenListAction";

import {
  FETCH_TOKEN_BY_ID_REQUEST,
  fetchTokenByIdSuccess,
  fetchTokenByIdFail,
} from "../actions/tokenAction";

// Saga to fetch token list
function* fetchTokenList() {
  try {
    // Make an API request to fetch token data
    const response = yield call(getData, "https://swap-api.thetatoken.org/swap/top-tokens");
    const fetchedTokens = response.data.body.tokens.filter(
      (item) => item.totalLiquidityUSD * 1 > 0
    );

    const data = yield call(getData, "https://assets.thetatoken.org/wallet-metadata/v1/data.json");

    const tokens = fetchedTokens.map((obj) => {
      const token =
        data.data.mainnet.tokens[
          Object.keys(data.data.mainnet.tokens).find(
            (id) => id.toLowerCase() === obj.id.toLowerCase()
          )
        ];

      if (token) {
        return { ...obj, logo: token.logo };
      }
      return obj;
    });
    yield put(fetchTokenListSuccess(tokens));
  } catch (error) {
    // Dispatch fail action with the error message
    yield put(fetchTokenListFail(error.message));
  }
}

// Saga to fetch token by ID
function* fetchTokenById(action) {
  try {
    const response = yield call(getData, `${process.env.REACT_APP_API_URL}/tokens/${action.payload}`);
    yield put(fetchTokenByIdSuccess(response.data)); // Dispatch success action with the token data
  } catch (error) {
    console.error("Error fetching token by ID:", error);
    yield put(fetchTokenByIdFail(error.message)); // Dispatch fail action with the error message
  }
}

// Watcher sagas
function* tokenSaga() {
  yield takeLatest(FETCH_TOKEN_LIST_REQUEST, fetchTokenList);
  yield takeLatest(FETCH_TOKEN_BY_ID_REQUEST, fetchTokenById);
}

export default tokenSaga;
