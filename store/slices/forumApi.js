import axios from "axios";
import { dispatch } from "../configureStore";
import "../../_mockApis";
import { forumUrl, markedURL } from "../servicesUrl";
import { slice } from "./forum";

const URL = forumUrl;
const MarkedURL = markedURL;

export function getForums(bearerToken) {
  return async () => {
    try {
      const response = await axios.get(URL, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response forums", response.data);
      dispatch(slice.actions.getForumSuccess(response.data));
      // const response = await mockAxios.get("/api/forum");
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCommentsByForumId(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/comment/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response comments by forum id", response.data);
      // const response = await mockAxios.get("/api/forum");
      dispatch(slice.actions.getCommentSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getForumByForumId(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      dispatch(slice.actions.getForumByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCommentByCommentId(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/comment/by-cid/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      dispatch(slice.actions.getCommentByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateForum(bearerToken, values) {
  return async () => {
    await axios
      .put(URL, {
        ...values,
        headers: { Authorization: `Bearer ${bearerToken}` },
      })
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} update member`, "info");
        // handleClose();
        dispatch(getForumByForumId(values.fid));
        dispatch(getForums());
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function deleteForum(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // handleClose();
      dispatch(getForums());
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteComment(bearerToken, forumId, commentId) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/comment/${commentId}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // handleClose();
      dispatch(getCommentsByForumId(forumId));
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addNewForum(bearerToken, values) {
  return async () => {
    await axios
      .post(`${URL}`, {
        ...values,
      })
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} add member`, "info");
        // handleClose();
        dispatch(getForums());
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function addNewComment(bearerToken, values) {
  // console.log("values add comment: ", values);
  return async () => {
    await axios
      .post(`${URL}/comment`, {
        ...values,
        headers: { Authorization: `Bearer ${bearerToken}` },
      })
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} add member`, "info");
        // handleClose();
        dispatch(getCommentsByForumId(values.fid));
      })
      .catch((err) => {
        console.log("error add comment: ", err);
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function getReplyByCommentId(bearerToken, commentId) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/reply/by-cid/${commentId}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      dispatch(slice.actions.getReplyByCommentIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addNewReply(bearerToken, values) {
  return async () => {
    await axios
      .post(`${URL}/reply`, {
        ...values,
        headers: { Authorization: `Bearer ${bearerToken}` },
      })
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} add member`, "info");
        // handleClose();
        dispatch(getCommentsByForumId(values.fid));
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function sendLikeSave(bearerToken, values) {
  return async () => {
    await axios
      .post(`${MarkedURL}/users/${values.uid}/marked-forums`, {
        ...values,
        headers: { Authorization: `Bearer ${bearerToken}` },
      })
      .then((res) => {
        // showSnackBar(`${res.data.error_schema.error_message.english} add member`, "info");
        // handleClose();
        console.log("res like save: ", res);
        // gimn cara biar bisa refresh yg di depan
        dispatch(getForums());
      })
      .catch((err) => {
        // showSnackBar(err.response.data.error_schema.error_message.english, "error");
        dispatch(slice.actions.hasError(err));
      });
  };
}

export function deleteReply(bearerToken, forumId, replyId) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/reply/${replyId}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // handleClose();
      dispatch(getCommentsByForumId(forumId));
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSavedForumsByUid(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${MarkedURL}/saved-forums/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response saved forums by uid", response.data);
      // const response = await mockAxios.get("/api/forum");
      dispatch(slice.actions.getSavedForumSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLikedForumsByUid(bearerToken, id) {
  return async () => {
    try {
      const response = await axios.get(`${MarkedURL}/liked-forums/${id}`, { headers: { Authorization: `Bearer ${bearerToken}` } });
      // console.log("response liked forums by uid", response.data);
      // const response = await mockAxios.get("/api/forum");
      dispatch(slice.actions.getLikedForumSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
