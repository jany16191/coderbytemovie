import { InsertPhoto } from "@mui/icons-material";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface IRating {
  Source: string;
  Value: string;
}

export interface IMovieDetailResponse {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: IRating[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export function MovieDetailContainer() {
  const navigate = useNavigate();
  const params = useParams();

  const [movie, setMovie] = useState<IMovieDetailResponse>();

  useEffect(() => {
    const movieId: string = params.movieId as string;

    fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=1a9d89ac`, {
      method: "GET",
    })
      .then((res) =>
        res.text().then((text) => (text ? JSON.parse(text) : true))
      )
      .then((MovieDetailResponse: IMovieDetailResponse) => {
        setMovie(MovieDetailResponse);
      })
      .catch(() => {
        // asi sa nic nerobi lebo appka je offline
      });
  }, [params.movieId]);

  return (
    <Container
      sx={{ flexGrow: 1 }}
      style={{ paddingTop: "64px", paddingBottom: "64px" }}
    >
      <Box py={4}>
        {movie && (
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            spacing={2}
          >
            <Grid container>
              <Grid item container width={150} justifyContent="center">
                <Grid item>
                  {movie.Poster !== "N/A" ? (
                    <img
                      src={movie.Poster}
                      height={100}
                      alt="poster"
                      style={{ borderRadius: "4px", maxWidth: "150px" }}
                    />
                  ) : (
                    <InsertPhoto style={{ height: "50px" }} fontSize="large" />
                  )}
                </Grid>
              </Grid>
              <Grid
                item
                container
                xs
                flexGrow={1}
                direction="column"
                alignItems="baseline"
              >
                <Grid item container alignItems="baseline">
                  <Grid item>
                    <Typography variant="h5" component="div">
                      {movie.Title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="div">
                      ({movie.Year})
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body2" component="div">
                    {movie.Genre}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body2" component="div">
                    Runtime: {movie.Runtime}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body2" component="div">
                    Writers: {movie.Writer}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body2" component="div">
                    Actors: {movie.Actors}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body2" component="div">
                    Director: {movie.Director}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body2" component="div">
                    IMDB Rating: {movie.imdbRating}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="body2" component="div">
                    IMDB Votes: {movie.imdbVotes}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    gutterBottom
                    variant="body2"
                    component="div"
                    textAlign="left"
                  >
                    Plot: {movie.Plot}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/movies")}
                  >
                    Go to search movies
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}
