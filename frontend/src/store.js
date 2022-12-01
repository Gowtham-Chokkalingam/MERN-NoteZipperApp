import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { noteListReducer } from "./Redux/reducers/notesReducer";
import { userLoginReducer, userRegisterReducer } from "./Redux/reducers/userReducer";

const reducer = combineReducers({
  // this will contain reducers

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  noteList: noteListReducer,
});

const useInfoFromLocal = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// const createComposer = window.__REDUX_DEVTOOLS_EXTENSION__ || compose;

const initialState = {
  userLogin: { userInfo: useInfoFromLocal },
};

const middleware = [thunk];

const store = legacy_createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
