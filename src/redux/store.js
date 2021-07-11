import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

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
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
