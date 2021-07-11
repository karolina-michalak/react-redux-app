import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectMuffinsArray } from "../../redux/selectors";
import { likeMuffin } from "../../redux/actions";

const Muffins = () => {
  const muffins = useSelector(selectMuffinsArray);
  const dispatch = useDispatch()

  return (
    <ul>
      {muffins.map((muffin) => {
          const handleLike = () => {
              dispatch(likeMuffin(muffin.id))
          }
        return <li key={muffin.id}>{muffin.name} <button onClick={handleLike}>like</button> <i>{muffin.likes}</i></li>;
      })}
    </ul>
  );
};

export default Muffins;
