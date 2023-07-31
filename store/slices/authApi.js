import axios from "axios";
import { dispatch } from "../configureStore";
import "../../_mockApis";
import { authUrl } from "../servicesUrl";
import { slice } from "./auth";
import { sliceUserPet } from "./userPet";
import { getPetsByUserId } from "./userPetApi";

// import { useReducer } from "react";
// import accountReducer from "../store/accountReducer";

const URL = authUrl;

export function getPetsByUid(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/${id}/pet`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response pets by uid", response.data);
      // const response = await mockAxios.get("/api/user");
      dispatch(slice.actions.selectCurrentPet(response.data[0]));
      dispatch(slice.actions.getPetsSuccess(response.data));
      dispatch(sliceUserPet.actions.getPetsByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function userLogin(values) {
  return async () => {
    await axios
      .post(`${URL}/login`, {
        ...values,
      })
      .then((res) => {
        dispatch(slice.actions.loginSuccess(res.data));
        // console.log("response muncul ", res.data.uid);
        dispatch(getPetsByUid(res.data.jwtToken, res.data.uid));
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function userRegister(values) {
  return async () => {
    await axios
      .post(`${URL}/register`, {
        ...values,
      })
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} add member`, "info");
        const loginValues = {
          email: values.email,
          password: values.password,
        };
        dispatch(userLogin(loginValues));
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}
