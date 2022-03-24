import {
  AUTH,
  SIGNUP_FAIL,
  LOGOUT,
  LOGOUT_FAILED,
} from "../constans/actionsConstant";

export default async (state = { userData: null }, action) => {
  switch (action.type) {
    case AUTH:
      await localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, userData: action.payload };
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
