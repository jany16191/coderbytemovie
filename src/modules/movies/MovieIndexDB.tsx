import { get, set, createStore } from "idb-keyval";
import { IMovie } from "./MovieContainer";

const movieStore = createStore("moviesDB", "movies");

export const setMovieToDB = async (movie: IMovie) => {
  let movies = await get("movieList", movieStore);

  movies && movies.length > 0 ? movies.push(movie) : (movies = [movie]);

  set("movieList", movies, movieStore);
};

export const getMovieFromDB = async () => {
  const res = await get("movieList", movieStore);

  const movies: IMovie[] = res as IMovie[];

  return movies ? movies : [];
};

export const getMovieIdsFromDB = async () => {
  const res = await get("movieList", movieStore);

  const movies: IMovie[] = res as IMovie[];

  const movieIds: string[] = movies.map((mov) => mov.imdbID);

  return movieIds ? movieIds : [];
};

export const removeMovieFromFavorite = async (movieId: string) => {
  let res = await get("movieList", movieStore);

  const movies: IMovie[] = res as IMovie[];

  const newMovieList: IMovie[] = movies?.filter(
    (mov) => mov.imdbID !== movieId
  );

  set("movieList", newMovieList, movieStore);

  return newMovieList;
};
