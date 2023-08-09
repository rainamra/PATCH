import { createSlice } from "@reduxjs/toolkit";

import "../../_mockApis";

const initialState = {
  error: null,
  currentUser: null,
  currentPet: null,
  userPets: null,
  token: null,
  isLoading: false,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    loginSuccess(state, action) {
      const payload = action.payload;
      state.currentUser = { ...payload };
      // console.log("payload login", payload);
      state.token = payload.jwtToken;
    },

    selectCurrentPet(state, action) {
      const payload = action.payload;
      // console.log("payload", payload);
      state.currentPet = payload;
    },

    getPetsSuccess(state, action) {
      const payload = action.payload;
      // console.log("payload pets", payload);
      state.pets = payload;
    },
  },
});

// Reducer
export default slice.reducer;
