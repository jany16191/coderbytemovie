import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MovieContainer } from "./modules/movies/MovieContainer";
import { WelcomePage } from "./modules/WelcomePage";
import { MovieHeader } from "./modules/movies/MovieHeader";
import { MovieDetailContainer } from "./modules/movies/detail/MovieDetailContainer";
import { MovieFavoritesContainer } from "./modules/movies/favorites/MovieFavoritesContainer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MovieHeader />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="movies">
            <Route index element={<MovieContainer />} />
            <Route path=":movieId" element={<MovieDetailContainer />} />
            <Route path="favorites" element={<MovieFavoritesContainer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
