export const likeMuffin = (muffinId) => ({
  type: "muffins/like",
  payload: { id: muffinId },
});

export const loadMuffins = () => async (dispatch) => {
  dispatch({
    type: "muffins/load_request",
  });

  try {
    const response = await fetch("http://localhost:3001/muffins");
    const data = await response.json();

    dispatch({
      type: "muffins/load_success",
      payload: {
        muffins: data,
      },
    });
  } catch (e) {
    dispatch({
      type: "muffins/load_failure",
      error: "Failed to load muffins.",
    });
  }
};

export const selectMuffinsState = (rootState) => rootState.muffins;
export const selectMuffinsArray = (rootState) => selectMuffinsState(rootState).muffins;
export const selectMuffinsLoading = (rootState) => selectMuffinsState(rootState).muffinsLoading;
export const selectMuffinsLoadError = (rootState) => selectMuffinsState(rootState).error;

const initialState = {
  muffins: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "muffins/like":
      const { id } = action.payload;
      return {
        ...state,
        muffins: state.muffins.map((muffin) => {
          if (muffin.id === id) {
            return { ...muffin, likes: muffin.likes + 1 };
          }
          return muffin;
        }),
      };

    case "muffins/load_request":
      return { ...state, muffinsLoading: true };

    case "muffins/load_success":
      const { muffins } = action.payload;
      return { ...state, muffinsLoading: false, muffins };

    case "muffins/load_failure":
      const { error } = action;
      return { ...state, muffinsLoading: false, error };

    default:
      return state;
  }
};

export default reducer;
