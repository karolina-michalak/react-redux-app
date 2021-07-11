import muffinsReducer from "./muffins";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { muffins: muffinsReducer },
});

export default store;
