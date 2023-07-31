import { createSlice } from "@reduxjs/toolkit";

import "../../_mockApis";

const initialState = {
  error: null,
  users: [],
  pets: [],
  petsById: null,
  selectedUser: false,
  selectedPet: false,
  filter: {},
  isLoading: false,
};

export const slice = createSlice({
  name: "userpet",
  initialState,
  reducers: {
    hasError(state, action) {
      state.error = action.payload;
    },

    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    getUserSuccess(state, action) {
      const payload = action.payload;
      state.users = payload;
    },

    getPetSuccess(state, action) {
      const payload = action.payload;
      state.pets = payload;
    },

    selectUserSuccess(state, action) {
      state.selectedUser = action.payload;
    },

    selectPetSuccess(state, action) {
      state.selectedPet = action.payload;
    },

    getPetByIdSuccess(state, action) {
      const payload = action.payload;
      state.selectedPet = payload;
    },

    getPetsByIdSuccess(state, action) {
      const payload = action.payload;
      state.petsById = payload;
    },

    getUserByIdSuccess(state, action) {
      const payload = action.payload;
      state.selectedUser = payload;
    },
  },
});

// Reducer
export default slice.reducer;
