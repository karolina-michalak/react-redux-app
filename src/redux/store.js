import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import muffinsReducer from "./muffins";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  muffins: muffinsReducer,
});

const store = configureStore({
  reducer: { muffins: muffinsReducer },
});

export default store;
