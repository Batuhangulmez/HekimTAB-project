import {
  FETCH_ALL,
  CREATE,
  FETCH_ALL_USER_POSTS,
  DELETE,
  GET_COMMENT,
} from "../constans/actionsConstant";
import * as api from "../axiox";

export const fetchPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    const reverseData = data.reverse();
    dispatch({ type: FETCH_ALL, payload: reverseData });
  } catch (error) {
    console.log(error);
  }
};
export const fetchPostUser = (creatorId) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostUser(creatorId);
    dispatch({ type: FETCH_ALL_USER_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const pushComment = (id, comment) => async (dispatch) => {
  try {
    await api.pushComment(id, comment);
    dispatch({ type: GET_COMMENT });
  } catch (error) {
    console.log(error);
  }
};
export const deleteComment = (id, comment) => async (dispatch) => {
  try {
    await api.deleteComment(id, comment);
    dispatch({ type: GET_COMMENT });
  } catch (error) {
    console.log(error);
  }
};
