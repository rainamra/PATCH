import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import mockAxios from "../../utils/axios";
import { dispatch } from "../index";
import "../../_mockApis";
import { chatUrl } from "../servicesUrl";

const initialState = {
  error: null,
  messages: [],
  selectedMessage: false,
  filter: {},
  isLoading: false,
};

const slice = createSlice({
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

const URL = chatUrl;

export function getMessageHistory(pid1, pid2) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/history?pid1=${pid1}&pid2=${pid2}`);
      console.log("response forums", response.data);
      dispatch(slice.actions.getMessageHistorySuccess(response.data));
      // const response = await mockAxios.get("/api/forum");
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getMessageById(id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      console.log("response message by id", response.data);
      // const response = await mockAxios.get("/api/forum");
      dispatch(slice.actions.getMessageByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateMessage(values) {
  return async () => {
    await axios
      .put(`${URL}/${values.msid}`, {
        ...values,
      })
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

export function deleteMessage(messageId, pid1, pid2) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/${messageId}`);
      // handleClose();
      dispatch(getMessageHistory(pid1, pid2));
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function sendMessage(values) {
  return async () => {
    await axios
      .post(`${URL}`, {
        ...values,
      })
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} add member`, "info");
        // handleClose();
        dispatch(getMessageHistory(values.pid1, values.pid2));
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}