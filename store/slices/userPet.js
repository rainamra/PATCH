import { createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import { dispatch } from "../index";
import "../../_mockApis";

const initialState = {
  error: null,
  users: [],
  pets: [],
  selectedUser: false,
  selectedPet: false,
  filter: {},
  isLoading: false,
};

const slice = createSlice({
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
      state.users = payload.users;
    },

    getPetSuccess(state, action) {
      const payload = action.payload;
      state.pets = payload.pets;
    },

    selectUserSuccess(state, action) {
      state.selectedUser = action.payload;
    },
    selectPetSuccess(state, action) {
      state.selectedPet = action.payload;
    },

    editUserSuccess(state, action) {
      state.selectedUser = action.payload;
    },

    editPetSuccess(state, action) {
      state.selectedUser = action.payload;
    },

    addUserSuccess(state, action) {
      state.selectedUser = action.payload;
    },

    addPetSuccess(state, action) {
      state.selectedPet = action.payload;
    },

    deletePetSuccess(state, action) {
      state.selectedPet = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// const URL = "/api/user";

export function getUsers() {
  console.log("muncul");
  return async () => {
    try {
      const response = await axios.get("/api/user");
      dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPets() {
  return async () => {
    try {
      const response = await axios.get("/api/user/pet");
      dispatch(slice.actions.getPetSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
