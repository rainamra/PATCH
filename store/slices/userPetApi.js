import axios from "axios";
import "../../_mockApis";
import { dispatch } from "../configureStore";
import { userPetUrl } from "../servicesUrl";
import { slice } from "./userPet";

const URL = userPetUrl;

export function getUsers(bearerToken) {
  return async () => {
    try {
      const response = await axios.get(URL, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response users", response.data);
      dispatch(slice.actions.getUserSuccess(response.data));
      // const response = await mockAxios.get("/api/user");
    } catch (error) {
      console.log("error muncul users", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPets(bearerToken) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/pets`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response pets", response.data);
      dispatch(slice.actions.getPetSuccess(response.data));
      // const response = await mockAxios.get("/api/user");
    } catch (error) {
      console.log("error muncul test", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPetsByUserId(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/${id}/pet`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response pets by user id", response.data);
      // const response = await mockAxios.get("/api/user");
      dispatch(slice.actions.getPetsByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserByUserId(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      dispatch(slice.actions.getUserByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPetByPetId(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/pet/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      dispatch(slice.actions.getPetByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateUser(bearerToken, values) {
  return async () => {
    await axios
      .put(
        URL,
        {
          ...values,
        },
        { headers: { Authorization: `Bearer ${bearerToken}` } }
      )
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} update member`, "info");
        // handleClose();
        dispatch(getUserByUserId(values.uid));
        dispatch(getUsers());
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function deleteUser(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // handleClose();
      dispatch(getUsers());
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updatePet(bearerToken, values) {
  return async () => {
    await axios
      .put(
        `${URL}/pet`,
        {
          ...values,
        },
        { headers: { Authorization: `Bearer ${bearerToken}` } }
      )
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} update member`, "info");
        // handleClose();
        dispatch(getPetByPetId(values.pid));
        dispatch(getPetsByUserId(values.uid));
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function deletePet(bearerToken, userId, petId) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/pet/${petId}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // handleClose();
      dispatch(getPetsByUserId(userId));
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addNewPet(bearerToken, values) {
  return async () => {
    await axios
      .post(
        `${URL}/pet`,
        {
          ...values,
        },
        { headers: { Authorization: `Bearer ${bearerToken}` } }
      )
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} add member`, "info");
        // handleClose();
        dispatch(getPetsByUserId(values.uid));
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}
