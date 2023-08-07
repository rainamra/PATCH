import axios from "axios";
import { dispatch } from "../configureStore";
import "../../_mockApis";
import { chatUrl } from "../servicesUrl";
import { slice } from "./chat";

const URL = chatUrl;

export function getMessageHistory(bearerToken, pid1, pid2) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/history?pid1=${pid1}&pid2=${pid2}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response forums", response.data);
      dispatch(slice.actions.getMessageHistorySuccess(response.data));
      // const response = await mockAxios.get("/api/forum");
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getMessageById(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      console.log("response message by id", response.data);
      // const response = await mockAxios.get("/api/forum");
      dispatch(slice.actions.getMessageByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateMessage(bearerToken, values) {
  return async () => {
    await axios
      .put(
        `${URL}/${values.msid}`,
        {
          ...values,
        },
        { headers: { Authorization: `Bearer ${bearerToken}` } }
      )
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} update member`, "info");
        // handleClose();
        dispatch(getMessageHistory(values.pid1, values.pid2));
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function deleteMessage(bearerToken, messageId, pid1, pid2) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/${messageId}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // handleClose();
      dispatch(getMessageHistory(pid1, pid2));
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function sendMessage(bearerToken, values) {
  return async () => {
    await axios
      .post(
        `${URL}/send`,
        {
          ...values,
        },
        { headers: { Authorization: `Bearer ${bearerToken}` } }
      )
      .then((res) => {
        dispatch(getMessageHistory(bearerToken, values.pid1, values.pid2));
      })
      .catch((err) => {
        dispatch(slice.actions.hasError(err));
      });
  };
}
