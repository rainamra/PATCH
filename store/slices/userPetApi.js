import axios from "axios";
import { dispatch } from "../configureStore";
import "../../_mockApis";
import { userPetUrl } from "../servicesUrl";
import { slice } from "./userPet";

const URL = userPetUrl;

export function getUsers() {
  return async () => {
    try {
      const response = await axios.get(URL);
      console.log("response users", response.data);
      dispatch(slice.actions.getUserSuccess(response.data));
      // const response = await mockAxios.get("/api/user");
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPets() {
  return async () => {
    try {
      const response = await axios.get(`${URL}/pets`);
      // console.log("response pets", response.data);
      dispatch(slice.actions.getPetSuccess(response.data));
      // const response = await mockAxios.get("/api/user");
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPetsByUserId(id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/${id}/pet`);
      console.log("response pets by user id", response.data);
      // const response = await mockAxios.get("/api/user");
      dispatch(slice.actions.getPetSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserByUserId(id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      dispatch(slice.actions.getUserByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPetByPetId(id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/pet/${id}`);
      dispatch(slice.actions.getPetByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateUser(values) {
  return async () => {
    await axios
      .put(URL, {
        ...values,
      })
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

export function deleteUser(id) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      // handleClose();
      dispatch(getUsers());
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updatePet(values) {
  return async () => {
    await axios
      .put(`${URL}/pet`, {
        ...values,
      })
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

export function deletePet(userId, petId) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/pet/${petId}`);
      // handleClose();
      dispatch(getPetsByUserId(userId));
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function registerUser(values) {
  return async () => {
    await axios
      .post(`${URL}/register`, {
        ...values,
      })
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} add member`, "info");
        // handleClose();
        dispatch(getUsers());
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function addNewPet(values) {
  return async () => {
    await axios
      .post(`${URL}/pet`, {
        ...values,
      })
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

// export function getPets() {
//   return async () => {
//     try {
//       const response = await mockAxios.get("/api/user/pet");
//       dispatch(slice.actions.getPetSuccess(response.data));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }