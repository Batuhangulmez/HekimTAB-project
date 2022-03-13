import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constans/actionsConstant";
import * as api from "../axiox";

export const fetchPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPost();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};
