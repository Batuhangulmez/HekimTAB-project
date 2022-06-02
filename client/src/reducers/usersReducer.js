import {
  AUTH,
  SIGNUP_FAIL,
  SIGNIN_FAIL,
  LOGOUT,
  LOGOUT_FAILED,
  GET_USER,
} from "../constans/actionsConstant";

export default (state = { userData: null, infoUser: {} }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, userData: action.payload };

    case GET_USER:
      return { ...state, infoUser: action.payload };

    case SIGNIN_FAIL:
      return { error: action.payload };

    case SIGNUP_FAIL:
      return { error: action.payload };

    case LOGOUT:
      localStorage.removeItem("user");
      return { ...state, userData: null };

    case LOGOUT_FAILED:
      return { error: action.payload };
    default:
      return state;
  }
};
