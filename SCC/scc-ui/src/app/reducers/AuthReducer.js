import { AUTH } from "../actions/constants/ActionType";

const initialState = {
  isAuthenticated: null,
  username: null,
  credentialInformation: null,
  sessionTimeout: 0,
  userDetail: null,
  lastLoginAttempt: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        username: action.payload.username,
        sessionTimeout: action.payload.expireAt,
        userDetail: action.payload.userDetail,
        credentialInformation: null,
        lastLoginAttempt: new Date(),
      };
    case AUTH.AUTH_ERROR:
    case AUTH.LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        username: null,
        isAuthenticated: false,
        sessionTimeout: 0,
        userDetail: null,
        credentialInformation: "Invalid Credential",
        lastLoginAttempt: new Date(),
      };
    case AUTH.LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        username: null,
        isAuthenticated: false,
        sessionTimeout: 0,
        userDetail: null,
        credentialInformation: null,
      };
    default:
      return state;
  }
};
