import { Container, Grid, IconButton, Typography } from "@mui/material";
import { InsertPhoto, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../MovieContainer";
import { getMovieFromDB, removeMovieFromFavorite } from "../MovieIndexDB";

export function MovieFavoritesContainer() {
  const navigate = useNavigate();

  const goToMovieDetail = (movieId: string) => {
    navigate(`/movies/${movieId}`);
  };

  const [movies, setMovies] = useState<IMovie[]>();

  useEffect(() => {
    getMovieFromDB().then((res: IMovie[]) => {
      setMovies(res);
    });
  }, []);

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
            Favorites movies
          </Typography>
        </Grid>
      </Grid>
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
                    sx={{ p: "5px" }}
                    onClick={() => {
                      removeMovieFromFavorite(mov.imdbID).then((moviesRes) => {
                        setMovies(moviesRes);
                      });
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            );
          })}
        </>
      ) : (
        <>
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
              <Typography gutterBottom variant="h5" component="div" margin={0}>
                No favorite movie
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
