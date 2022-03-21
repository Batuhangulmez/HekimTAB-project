import { AUTH, SIGNUP_FAIL } from "../constans/actionsConstant";
import * as api from "../axiox";

export const signUp = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    dispatch({
      tpye: SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const Login = (formData) => async (dispatch) => {
  try {
    const { data } = await api.Login(formData);

    dispatch({ type: AUTH, payloda: data });
  } catch (error) {
    dispatch({
      tpye: SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
