import {
  AUTH,
  SIGNUP_FAIL,
  SIGNIN_FAIL,
  LOGOUT,
  LOGOUT_FAILED,
} from "../constans/actionsConstant";
import * as api from "../axiox";

export const signUp = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const Login = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.Login(formData);

    dispatch({ type: AUTH, payload: data });
    history.push("/");
  } catch (error) {
    dispatch({
      type: SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = (id) => async (dispatch) => {
  try {
    const { message } = await api.logOut(id);

    dispatch({ type: LOGOUT, payload: message });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
