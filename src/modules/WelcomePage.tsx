import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Container
      sx={{ flexGrow: 1 }}
      style={{ paddingTop: "64px", paddingBottom: "64px" }}
    >
      <Box py={4}>
        <Grid container direction="column" alignItems="center" spacing={4}>
          <Grid item>
            <Typography variant="h3">Welcome to movies page</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/movies")}
            >
              Go to search movies
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
