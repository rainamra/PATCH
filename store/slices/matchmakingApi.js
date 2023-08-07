import axios from "axios";
import { dispatch } from "../configureStore";
import "../../_mockApis";
import { matchMakingUrl } from "../servicesUrl";
import { slice } from "./matchmaking";
import { Alert } from 'react-native';

const URL = matchMakingUrl;

export function getLikesDislikes(bearerToken) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/likedislike`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response likes dislikes", response.data);
      dispatch(slice.actions.getLikesDislikes(response.data));
      // const response = await mockAxios.get("/api/like");
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getMatches(bearerToken) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/matchhistories`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response matches ", response.data);
      dispatch(slice.actions.getMatchesSuccess(response.data));
      return response.data;
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLikesByPid(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/likedislike/pet/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response like by pid", response.data);
      // const response = await mockAxios.get("/api/like");
      dispatch(slice.actions.getLikesByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLikeDislikeById(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/likedislike/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      dispatch(slice.actions.getLikeDislikeByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getMatchByMatchId(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/matchhistories/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
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

export function sendLikeDislike(bearerToken, values) {
  return async () => {
    await axios
      .post(
        `${URL}/likedislike`,
        {
          ...values,
        },
        {
          headers: { Authorization: `Bearer ${bearerToken}` },
        }
      )
      // .then((res) => {
      //   console.log("response sendlikedislike", res.data);
      //   // dispatch(getMatches(bearerToken));
      //   return res.data;
      // })
      .catch((err) => {
        console.log("error muncul sendlikedislike", err);
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function deleteLike(bearerToken, id, petId) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/likedislike/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // handleClose();
      dispatch(getLikesByPid(bearerToken, petId));
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteMatch(bearerToken, matchId) {
  // console.log("masuk delete match ", matchId);
  return async () => {
    await axios
      .delete(`${URL}/matchhistories/${matchId}`, { headers: { Authorization: `Bearer ${bearerToken}` } })
      .then((res) => {
        dispatch(getMatches(bearerToken));
        Alert.alert("Information", "Successfully unmatched");
      })
      .catch((err) => {
        console.log("error muncul unmatch", err);
        Alert.alert("Error", "Failed to unmatch");
        dispatch(slice.actions.hasError(err));
      });
  };
}
