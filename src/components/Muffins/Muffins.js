import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMuffinsArray,
  selectMuffinsLoadError,
  selectMuffinsLoading,
} from "../../redux/selectors";
import { likeMuffin, loadMuffins } from "../../redux/actions";

const Muffins = () => {
  const muffins = useSelector(selectMuffinsArray);
  const dispatch = useDispatch();
  const muffinsLoading = useSelector(selectMuffinsLoading);
  const loadError = useSelector(selectMuffinsLoadError);

  useEffect(() => {
    dispatch(loadMuffins());
  }, []);

  return muffinsLoading ? (
    <p>loading...</p>
  ) : loadError ? (
    <p>{loadError}</p>
  ) : muffins.length ? (
    <ul>
      {muffins.map((muffin) => {
        const handleLike = () => {
          dispatch(likeMuffin(muffin.id));
        };
        return (
          <li key={muffin.id}>
            {muffin.name} <button onClick={handleLike}>like</button>{" "}
            <i>{muffin.likes}</i>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>Muffins have finished</p>
  );
};

export default Muffins;
