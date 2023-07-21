import axios from "axios";
import { dispatch } from "../configureStore";
import "../../_mockApis";
import { forumUrl, markedURL } from "../servicesUrl";
import { slice } from "./forum";

const URL = forumUrl;
const MarkedURL = markedURL;

export function getForums() {
  return async () => {
    try {
      const response = await axios.get(URL);
      // console.log("response forums", response.data);
      dispatch(slice.actions.getForumSuccess(response.data));
      // const response = await mockAxios.get("/api/forum");
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCommentsByForumId(id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/comment/${id}`);
      // console.log("response comments by forum id", response.data);
      // const response = await mockAxios.get("/api/forum");
      dispatch(slice.actions.getCommentSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getForumByForumId(id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      dispatch(slice.actions.getForumByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCommentByCommentId(id) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/comment/by-cid/${id}`);
      dispatch(slice.actions.getCommentByIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateForum(values) {
  return async () => {
    await axios
      .put(URL, {
        ...values,
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

export function deleteForum(id) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/${id}`);
      // handleClose();
      dispatch(getForums());
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteComment(forumId, commentId) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/comment/${commentId}`);
      // handleClose();
      dispatch(getCommentsByForumId(forumId));
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addNewForum(values) {
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

export function addNewComment(values) {
  // console.log("values add comment: ", values);
  return async () => {
    await axios
      .post(`${URL}/comment`, {
        ...values,
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

export function getReplyByCommentId(commentId) {
  return async () => {
    try {
      const response = await axios.get(`${URL}/reply/by-cid/${commentId}`);
      dispatch(slice.actions.getReplyByCommentIdSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addNewReply(values) {
  return async () => {
    await axios
      .post(`${URL}/reply`, {
        ...values,
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

export function deleteReply(forumId, replyId) {
  return async () => {
    try {
      const response = await axios.delete(`${URL}/reply/${replyId}`);
      // handleClose();
      dispatch(getCommentsByForumId(forumId));
    } catch (error) {
      // showSnackBar(error.response.data.error_schema.error_message.english, "error");
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSavedForumsByUid(id) {
  return async () => {
    try {
      const response = await axios.get(`${MarkedURL}/saved-forums/${id}`);
      // console.log("response saved forums by uid", response.data);
      // const response = await mockAxios.get("/api/forum");
      dispatch(slice.actions.getSavedForumSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLikedForumsByUid(id) {
  return async () => {
    try {
      const response = await axios.get(`${MarkedURL}/liked-forums/${id}`);
      // console.log("response liked forums by uid", response.data);
      // const response = await mockAxios.get("/api/forum");
      dispatch(slice.actions.getLikedForumSuccess(response.data));
    } catch (error) {
      console.log("error muncul ", error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
