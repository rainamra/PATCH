import { createSlice } from "@reduxjs/toolkit";

import "../../_mockApis";

const initialState = {
  error: null,
  likesDislikes: [],
  likes: [],
  matches: [],
  selectedLike: false,
  selectedMatch: false,
  filter: {},
  isLoading: false,
};

export const slice = createSlice({
  name: "matchmaking",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    getLikeDislikeSuccess(state, action) {
      const payload = action.payload;
      state.likesDislikes = payload;
    },

    getLikesByIdSuccess(state, action) {
      const payload = action.payload;
      state.likes = payload;
    },

    getMatchesSuccess(state, action) {
      const payload = action.payload;
      state.matches = payload;
    },

    getMatchesByIdSuccess(state, action) {
      const payload = action.payload;
      state.matches = payload;
    },

    getLikeDislikeByIdSuccess(state, action) {
      state.selectedLike = action.payload;
    },

    selectMatchSuccess(state, action) {
      state.selectedMatch = action.payload;
    },

    getMatchByIdSuccess(state, action) {
      const payload = action.payload;
      state.selectedMatch = payload;
    },

    getLikeByIdSuccess(state, action) {
      const payload = action.payload;
      state.selectedLike = payload;
    },
  },
});

// Reducer
export default slice.reducer;
