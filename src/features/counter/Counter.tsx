import React from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setMovies, selectMovies } from "./counterSlice";
import styles from "./Counter.module.css";

export function Counter() {
  const movies = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() =>
            dispatch(
              setMovies({
                Poster: "N/A",
                Title: "Amazing Spiderman Syndrome",
                Type: "movie",
                Year: "2012",
                imdbID: "tt2586634",
              })
            )
          }
        >
          +
        </button>
      </div>
      <div>
        {movies.map((mov, idx) => {
          return <div key={idx}>{mov.Title}</div>;
        })}
      </div>
    </div>
  );
}
