import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const getPosts = createAsyncThunk("posts/getPosts", async () => {
//   return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
//     res.json()
//   );
// });

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  const data = res.json();

  return data;
});

const initialState = {
  posts: [
    { id: "1", title: "First Post!", content: "Hello!", completed: true },
    { id: "2", title: "Second Post", content: "More text", completed: false },
  ],
  status: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded(state, action) {
      state.posts.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = [...state.posts].concat(action.payload);
      console.log("action", action.payload);
    });
    // [getPosts.fulfilled.toString()]: (state, action) => {
    //   state.posts = action.payload;
    //   console.log("action", action.payload);
    // },
  },
});

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
