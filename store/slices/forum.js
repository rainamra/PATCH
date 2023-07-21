import { createSlice } from "@reduxjs/toolkit";

import "../../_mockApis";

const initialState = {
  error: null,
  comments: [],
  forums: [],
  replies: [],
  savedForums: [],
  likedForums: [],
  selectedForum: false,
  selectedComment: false,
  filter: {},
  isLoading: false,
};

export const slice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    getForumSuccess(state, action) {
      const payload = action.payload;
      state.forums = payload;
      // console.log("test get all forum ", state.forums);
    },

    getSavedForumSuccess(state, action) {
      const payload = action.payload;
      state.savedForums = payload;
    },

    getLikedForumSuccess(state, action) {
      const payload = action.payload;
      state.likedForums = payload;
    },

    getCommentSuccess(state, action) {
      const payload = action.payload;
      state.comments = payload;
      // console.log("test get comments by id ", state.comments);
    },

    selectForumSuccess(state, action) {
      state.selectedForum = action.payload;
    },

    selectCommentSuccess(state, action) {
      state.selectedComment = action.payload;
    },

    getCommentByIdSuccess(state, action) {
      const payload = action.payload;
      state.selectedComment = payload;
    },

    getReplyByCommentIdSuccess(state, action) {
      const payload = action.payload;
      state.replies = payload;
    },

    getForumByIdSuccess(state, action) {
      const payload = action.payload;
      state.selectedForum = payload;
    },
  },
});

// Reducer
export default slice.reducer;
