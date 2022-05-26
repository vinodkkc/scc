import axios from "axios";
import { AUTH } from "../constants/ActionType";
import userData from "../../../shared/UserData.json";
import * as CONSTANT from "../../../shared/Constants";
import { PageLoading, PageLoaded } from "../SccCommonAction";

// Login User from JSON file
export const login = (userCred) => {
  let credCheck = true;
  let expireTime = new Date();
  expireTime = expireTime.setMinutes(
    expireTime.getMinutes() + parseInt(process.env.REACT_APP_LOGIN_TIMEOUT)
  );
  const token = {
    expireAt: expireTime,
    userDetail: userCred,
  };

  for (const user of userData) {
    if (
      user.username === userCred.username &&
      user.password === userCred.password
    ) {
      credCheck = false;
      break;
    }
  }

  if (credCheck) {
    return {
      type: AUTH.LOGIN_FAIL,
    };
  } else {
    return {
      type: AUTH.LOGIN_SUCCESS,
      payload: token,
    };
  }
};

export function loginAPI({ username, password }, history) {
  return (dispatch) => {
    dispatch(PageLoading());
    let serverBaseUrl = window._env_.REACT_APP_SERVER_BASE_PATH || process.env.REACT_APP_SERVER_BASE_PATH;
    console.log("serverBase:: ", serverBaseUrl);

    const loginPath = window._env_.REACT_APP_SERVER_LOGIN_API || process.env.REACT_APP_SERVER_LOGIN_API;
    const session_url = serverBaseUrl + loginPath;
    axios
      .post(
        session_url,
        {},
        {
          auth: {
            username: username,
            password: password,
          },
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "*/*",
          },
        }
      )
      .then((response) => {
        let expireTime = new Date();
        const loginTimeout = window._env_.REACT_APP_LOGIN_TIMEOUT || process.env.REACT_APP_LOGIN_TIMEOUT;
        expireTime = expireTime.setMinutes(
          expireTime.getMinutes() +
            parseInt(loginTimeout)
        );
        const token = {
          expireAt: expireTime,
          username: response.data.username,
          userDetail: response.config.auth,
        };

        dispatch({
          type: AUTH.LOGIN_SUCCESS,
          payload: token,
        });
        history.replace(CONSTANT.ROUTE.DASHBOARD);
        dispatch(PageLoaded());
      })
      .catch((err) => {
        dispatch({
          type: AUTH.LOGIN_FAIL,
        });
        dispatch(PageLoaded());
      });
  };
}

// Logout User for JSON file
export const logout = () => {
  return {
    type: AUTH.LOGOUT_SUCCESS,
  };
};

export function logoutAPI(userCredential, history) {
  return (dispatch) => {
    dispatch(PageLoading());
    let serverBaseUrl = window._env_.REACT_APP_SERVER_BASE_PATH || process.env.REACT_APP_SERVER_BASE_PATH;
    console.log("serverBase:: ", serverBaseUrl);

    const logoutPath = window._env_.REACT_APP_SERVER_LOGOUT_API || process.env.REACT_APP_SERVER_LOGOUT_API;
    const session_url = serverBaseUrl + logoutPath;

    axios
      .post(
        session_url,
        {},
        {
          auth: {
            username: userCredential.username,
            password: userCredential.password,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: AUTH.LOGOUT_SUCCESS,
        });
        history.replace(CONSTANT.ROUTE.LOGIN);
        dispatch(PageLoaded());
      })
      .catch((err) => {
        dispatch({
          type: AUTH.AUTH_ERROR,
        });
        dispatch(PageLoaded());
      });
  };
}
