import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import mockAxios from "../../utils/axios";
import { dispatch } from "../index";
import "../../_mockApis";
import { matchMakingUrl } from "../servicesUrl";

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

const slice = createSlice({
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

const URL = matchMakingUrl;

export function getLikesDislikes() {
  return async () => {
    try {
      const response = await axios.get(`${URL}/likedislike`);
      console.log("response likes dislikes", response.data);
      dispatch(slice.actions.getLikesDislikes(response.data));
      // const response = await mockAxios.get("/api/like");
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLikesByPid(id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/likedislike/pet/${id}`);
      console.log("response like by pid", response.data);
      // const response = await mockAxios.get("/api/like");
      dispatch(slice.actions.getLikesByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLikeDislikeById(id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/likedislike/${id}`);
      dispatch(slice.actions.getLikeDislikeByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getMatchByMatchId(id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/matchhistories/${id}`);
      dispatch(slice.actions.getMatchByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// export function getMatchesByPid(id) {
//   return async () => {
//     try {
//       const response = await axios.get(`${URL}/likedislike/pet/${id}`);
//       console.log("response like by pid", response.data);
//       // const response = await mockAxios.get("/api/like");
//       dispatch(slice.actions.getMatchesByIdSuccess(response.data));
//     } catch (error) {
//       console.log("error muncul ", error);
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

export function sendLikeDislike(values) {
  return async () => {
    await axios
      .post(URL, {
        ...values,
      })
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} update member`, "info");
        // handleClose();
        dispatch(getLikesByPid(values.pid1));
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function deleteLike(id, petId) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/likedislike/${id}`);
      // handleClose();
      dispatch(getLikesByPid(petId));
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteMatch(matchId, petId) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/matchhistories/${matchId}`);
      // handleClose();
    //   dispatch(getMatchesByPid(petId));
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}
