import {
  createReducer,
  createAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const likeMuffin = createAction("muffins/like", (muffinId) => {
  return { payload: { id: muffinId } };
});

export const loadMuffins = createAsyncThunk("muffins/load", async () => {
  const response = await fetch("http://localhost:3001/muffins");
  const muffins = await response.json();
  return { muffins };
});

export const selectMuffinsState = (rootState) => rootState.muffins;
export const selectMuffinsArray = (rootState) =>
  selectMuffinsState(rootState).muffins;
export const selectMuffinsLoading = (rootState) =>
  selectMuffinsState(rootState).muffinsLoading;
export const selectMuffinsLoadError = (rootState) =>
  selectMuffinsState(rootState).error;

const initialState = {
  muffins: [],
};

const reducer = createReducer(initialState, {
  [likeMuffin]: (state, action) => {
    const muffinToLike = state.muffins.find(
      (muffin) => muffin.id === action.payload.id
    );
    muffinToLike.likes += 1;
  },

  [loadMuffins.pending]: (state) => {
    state.muffinsLoading = true;
  },

  [loadMuffins.fulfilled]: (state, action) => {
    state.muffinsLoading = false;
    state.muffins = action.payload.muffins;
  },

  [loadMuffins.rejected]: (state) => {
    state.muffinsLoading = false;
    state.error = "Failed to load data";
  },
});

export default reducer;
