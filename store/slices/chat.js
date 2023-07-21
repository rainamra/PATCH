import { createSlice } from "@reduxjs/toolkit";

import "../../_mockApis";

const initialState = {
  error: null,
  messages: [],
  selectedMessage: false,
  filter: {},
  isLoading: false,
};

export const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    getMessageHistorySuccess(state, action) {
      const payload = action.payload;
      state.messages = payload;
    },

    selectMessageSuccess(state, action) {
      state.selectedMessage = action.payload;
    },

    getMessageByIdSuccess(state, action) {
      const payload = action.payload;
      state.selectedMessage = payload;
    },
  },
});

// Reducer
export default slice.reducer;
