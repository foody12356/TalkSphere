import { createSlice } from "@reduxjs/toolkit";

//this data is provded throughout the progragram 
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"; //FOR SETTING THE MODES
    },
    setLogin: (state, action) => { //this is for the login states and it's action
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {  //this is for logout states and it's action IT'S RESET THE everything 
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => { //set friends into local state
      if (state.user) {
        state.user.friends = action.payload.friends;  //is user exist we set it's action 
      } else {
        console.error("user friends non-existent :(");  //user friend not exist 
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;  //set the posts
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {   //to update grab all the posts 
        if (post._id === action.payload.post._id) return action.payload.post;   //if id matches then we return the post 
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;