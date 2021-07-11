import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { boolean, string } from "yargs";
import { loadMuffins } from "./actions";

export const selectMuffinsState = (rootState) => rootState.muffins;
export const selectMuffinsArray = (rootState) =>
  selectMuffinsState(rootState).muffins;
export const selectMuffinsLoading = (rootState) =>
  selectMuffinsState(rootState).muffinsLoading;
export const selectMuffinsLoadError = (rootState) =>
  selectMuffinsState(rootState).error;

const initialState = {
  muffins: [],
  muffinsLoading: boolean,
  error: string
};

const muffinsSlice = createSlice({
  name: "muffins",
  initialState,
  reducers: {
    likeMuffin: {
      reducer: (state, action) => {
        const muffinToLike = state.muffins.find(
          (muffin) => muffin.id === action.payload.id
        );
        muffinToLike += 1;
      },
      prepare: (muffinId) => {
        return { payload: { id: muffinId } };
      },
    },
  },
  extraReducers: {
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
  },
});

export const { likeMuffin } = muffinsSlice.actions;

export default muffinsSlice.reducer;
