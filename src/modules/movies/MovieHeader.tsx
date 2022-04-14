import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export function MovieHeader() {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate(`/`)}
        >
          <Home />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Movies
        </Typography>
        <Button color="inherit" onClick={() => navigate(`/movies/favorites`)}>
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
}
