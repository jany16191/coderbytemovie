import { Box, Container, Grid, Typography } from "@mui/material";
import { Button, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { createSelector } from "reselect";
import { RootState } from "../app/store";
// import { AddPostForm } from "../features/posts/AddPostForm";
import { AddPostForm_Ant } from "../features/posts/AddPostForm_Ant";
import { getPosts } from "../features/posts/postsSlice";
import { ReselectContainer } from "./test/reselect/ReselectContainer";
import { StyledComponentContainer } from "./test/StyledComponentContainer";

export function WelcomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postsArr = useSelector((state: RootState) => state.posts.posts);
  const posts = (state: RootState) => state.posts.posts;

  // const postsShow = useSelector(
  //   createSelector(posts, (items) =>
  //     items.filter((p) => p.title.toLowerCase().includes("first"))
  //   )
  // );

  const postsShow = useSelector(posts);

  const { TabPane } = Tabs;

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
            <Button size="large" onClick={() => navigate("/movies")}>
              Go to search movies
            </Button>
          </Grid>
        </Grid>
        <Tabs type="card">
          <TabPane active tab="Add post" key="1">
            <AddPostForm_Ant />
          </TabPane>
          <TabPane tab="List posts" key="2">
            {postsArr.map((post, idx) => {
              return <div key={`${post.id} ${idx}`}>{post.title}</div>;
            })}
            <Button type="primary" onClick={() => dispatch(getPosts())}>
              Posts Button
            </Button>
          </TabPane>
          <TabPane tab="Styled component" key="3">
            <StyledComponentContainer />
          </TabPane>
          <TabPane tab="Reselect redux" key="4">
            <ReselectContainer />
          </TabPane>
        </Tabs>
      </Box>
    </Container>
  );
}
