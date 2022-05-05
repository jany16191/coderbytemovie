import {
  Box,
  Container,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
// import axios from "axios";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { MemoizedMovie } from "./MovieList";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectMovies, setMovies } from "../../features/counter/counterSlice";

export interface IMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface ISearchMovieResponse {
  Response: string;
  Search: IMovie[];
  totalResults: string;
}

const axios = require("axios").default;

export function MovieContainer() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);

  const [searchValue, setSearch] = useState<string>("");
  const [currPage, setCurrPage] = useState<number>(0);

  const [totalResults, setTotalResults] = useState<number>(0);

  const getMovies = async (search: string, page: number) => {
    //AXIOS ASYNC/AWAIT
    const res = await axios.get(
      `http://www.omdbapi.com/?s=${search}&page=${page}&apikey=1a9d89ac`
    );

    const data: ISearchMovieResponse = res.data;
    if (page === 1) {
      dispatch(setMovies(data.Search));
    } else {
      const actMovies = movies?.concat(data.Search);
      dispatch(setMovies(actMovies));
    }

    setTotalResults(+data.totalResults);
    setCurrPage(page);

    //AXIOS CEZ THEN
    // axios
    //   .get(`http://www.omdbapi.com/?s=${search}&page=${page}&apikey=1a9d89ac`)
    //   .then((res) => {
    //     const data: ISearchMovieResponse = res.data;
    //     if (page === 1) {
    //       dispatch(setMovies(data.Search));
    //     } else {
    //       const actMovies = movies?.concat(data.Search);
    //       dispatch(setMovies(actMovies));
    //     }

    //     setTotalResults(+data.totalResults);
    //     setCurrPage(page);
    //   });

    //KLASICKY FETCH ASYNC/AWAIT
    // const res = await fetch(
    //   `http://www.omdbapi.com/?s=${search}&page=${page}&apikey=1a9d89ac`,
    //   {
    //     method: "GET",
    //   }
    // );

    // const data: ISearchMovieResponse = await res.json();

    // if (page === 1) {
    //   dispatch(setMovies(data.Search));
    // } else {
    //   const actMovies = movies?.concat(data.Search);
    //   dispatch(setMovies(actMovies));
    // }

    // setTotalResults(+data.totalResults);
    // setCurrPage(page);

    //KLASICKY FETCH CEZ THEN
    // fetch(`http://www.omdbapi.com/?s=${search}&page=${page}&apikey=1a9d89ac`, {
    //   method: "GET",
    // })
    //   .then((res) =>
    //     res.text().then((text) => (text ? JSON.parse(text) : true))
    //   )
    //   .then((MovieResponse: ISearchMovieResponse) => {
    //     if (page === 1) {
    //       dispatch(setMovies(MovieResponse.Search));
    //     } else {
    //       const actMovies = movies?.concat(MovieResponse.Search);
    //       dispatch(setMovies(actMovies));
    //     }

    //     setTotalResults(+MovieResponse.totalResults);
    //     setCurrPage(page);
    //   })
    //   .catch(() => {
    //     // asi sa nic nerobi lebo appka je offline
    //   });
  };

  useEffect(() => {
    return () => {
      dispatch(setMovies([]));
    };
  }, [dispatch]);

  const onSubmit = () => {
    dispatch(setMovies([]));
    getMovies(searchValue, 1);
  };

  return (
    <Container
      sx={{ flexGrow: 1 }}
      style={{ paddingTop: "64px", paddingBottom: "64px" }}
    >
      <Grid container pt={4} justifyContent="center">
        <Grid item>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            margin={0}
            textAlign="center"
          >
            Search movies
          </Typography>
        </Grid>
      </Grid>
      <Box py={4}>
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            value={searchValue}
            placeholder="Search movies"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDownCapture={(e) => {
              if (e.key && e.key === "Enter") onSubmit();
            }}
          />
          <IconButton sx={{ p: "10px" }} onClick={() => onSubmit()}>
            <Search />
          </IconButton>
        </Paper>
      </Box>
      <MemoizedMovie
        searchValue={searchValue}
        getMovies={getMovies}
        currPage={currPage}
        movies={movies}
        totalResults={totalResults}
      />
    </Container>
  );
}
