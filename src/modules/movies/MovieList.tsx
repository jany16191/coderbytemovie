import { Button, Grid, IconButton, Typography } from "@mui/material";
import { InsertPhoto, Star } from "@mui/icons-material";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMovie } from "./MovieContainer";
import { getMovieIdsFromDB, setMovieToDB } from "./MovieIndexDB";

interface IMovieList {
  getMovies: (search: string, page: number) => void;
  movies: IMovie[];
  searchValue: string;
  currPage: number;
  totalResults: number;
}

export function MovieList({
  searchValue,
  currPage,
  totalResults,
  movies,
  getMovies,
}: IMovieList) {
  const navigate = useNavigate();

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    getMovieIdsFromDB().then((res) => {
      setFavoriteIds(res);
    });
  }, []);

  const goToMovieDetail = (movieId: string) => {
    navigate(`/movies/${movieId}`);
  };

  const noShowMore: boolean = currPage * 10 >= totalResults;

  return (
    <>
      {movies && movies.length > 0 ? (
        <>
          {movies.map((mov) => {
            return (
              <Grid
                key={mov.imdbID}
                container
                my={2}
                px={1}
                py={0.5}
                alignItems="center"
                border="1px solid #a5a7a6"
                borderRadius={2}
              >
                <Grid
                  container
                  item
                  xs
                  alignItems="center"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    goToMovieDetail(mov.imdbID);
                  }}
                >
                  <Grid item style={{ display: "flex" }}>
                    {mov.Poster !== "N/A" ? (
                      <img
                        src={mov.Poster}
                        height={50}
                        width={35}
                        alt="poster"
                        style={{ borderRadius: "4px" }}
                      />
                    ) : (
                      <InsertPhoto
                        style={{ height: "50px" }}
                        fontSize="large"
                      />
                    )}
                  </Grid>
                  <Grid item flexGrow={1} textAlign="left" px={4}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      margin={0}
                    >
                      {mov.Title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      margin={0}
                    >
                      {mov.Year}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item width={50}>
                  <IconButton
                    color={
                      favoriteIds.includes(mov.imdbID) ? "warning" : "default"
                    }
                    sx={{ p: "5px" }}
                    onClick={(e) => {
                      e.preventDefault();
                      setMovieToDB(mov).then(() => {
                        getMovieIdsFromDB().then((res) => {
                          setFavoriteIds(res);
                        });
                      });
                    }}
                  >
                    <Star />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Button
                onClick={() => {
                  if (!noShowMore) {
                    getMovies(searchValue, currPage + 1);
                  }
                }}
                disabled={noShowMore}
              >
                {noShowMore ? (
                  <span>
                    No more results {totalResults}/{totalResults}
                  </span>
                ) : (
                  <span>
                    Show more ({currPage * 10}/{totalResults})
                  </span>
                )}
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          {currPage !== 0 && (
            <Grid
              container
              my={2}
              px={1}
              py={1}
              alignItems="center"
              border="1px solid #a5a7a6"
              borderRadius={2}
            >
              <Grid item>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  margin={0}
                >
                  No movies
                </Typography>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </>
  );
}

export const MemoizedMovie = memo(MovieList);
