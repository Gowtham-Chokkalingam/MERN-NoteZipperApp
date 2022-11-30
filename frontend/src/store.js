import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const reducer = combineReducers({
  // this will contain reducers
});

const initialState = {};

const middleware = [thunk];

const store = legacy_createStore(reducer, initialState, applyMiddleware(...middleware));


export default store;
