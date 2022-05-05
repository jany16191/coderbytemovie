import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { RootState } from "../../../app/store";
import { increment } from "../../../features/counter/counterSlice";
import ConnectContainer from "../connect/ConnectContainer";

const selectNumCompletedTodos = createSelector(
  (state: RootState) => state.posts.posts,
  (posts) => posts.filter((post) => post.completed).length
);

export const CompletedTodosCounter = () => {
  const numCompletedTodos: number = useSelector(selectNumCompletedTodos);
  return <div>{numCompletedTodos}</div>;
};

export const ReselectContainer = () => {
  const dispatch = useDispatch();
  const incrementCounter = useCallback(
    () => dispatch({ type: "counter/increment" }),
    [dispatch]
  );

  const count = useSelector((state: RootState) => state.movies.value);

  return (
    <>
      {/* <span>Number of completed todos:</span>
      <CompletedTodosCounter /> */}
      <div>Count: {count}</div>

      <MyIncrementButton onIncrement={incrementCounter} />
      <ConnectContainer />
    </>
  );
};

export const MyIncrementButton = React.memo(
  ({
    onIncrement,
  }: {
    onIncrement: () => {
      type: string;
    };
  }) => (
    <>
      <button onClick={onIncrement}>Increment counter</button>
    </>
  )
);

// export const ReselectContainer = () => {
//   const post = useSelector((state: RootState) => state.posts.posts[0]);

//   return <div>{post.title}</div>;
// };
