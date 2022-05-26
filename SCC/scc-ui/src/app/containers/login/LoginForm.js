import Typography from "@material-ui/core/Typography";
import i18next from "i18next";
import React, { useRef, useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { useStyles } from "./style/LoginFormStyle";
import { logoutAPI, loginAPI } from "../../actions/authentication/AuthAction";
import { PageLoaded } from "../../actions/SccCommonAction";
import { connect, useDispatch } from "react-redux";
import store from "../../store/Store";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import * as CONSTANT from "../../../shared/Constants";

function LoginForm(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const classes = useStyles();
  const LOGIN = i18next.t("LOGIN", { returnObjects: true });
  const COMMON = i18next.t("COMMON", { returnObjects: true });
  const translations = {
    LOGIN: LOGIN.LOGIN,
    FORGOT_PASSWORD: LOGIN.FORGOT_PASSWORD,
    PASSWORD: LOGIN.PASSWORD,
    USERNAME: LOGIN.USERNAME,
    SECURITY_COMMAND_CENTER: COMMON.SECURITY_COMMAND_CENTER,
    EMPTY_ERROR: LOGIN.EMPTY_ERROR,
    USERNAME_MIN_LENGTH_ERROR: LOGIN.USERNAME_MIN_LENGTH_ERROR,
    INVALID_CREDENTIAL: LOGIN.INVALID_CREDENTIAL,
  };

  useEffect(() => {
    dispatch(PageLoaded());
    if (props.sessionTimeout && Date.parse(new Date()) > props.sessionTimeout) {
      store.dispatch(logoutAPI(props.userCredential, history));
    }
    if (props.isAuthenticated) {
      setMessage(null);
      history.replace(CONSTANT.ROUTE.DASHBOARD);
    } else {
      if (props.credentialInformation) {
        setMessage(translations.INVALID_CREDENTIAL);
      }
    }
  }, [
    props.isAuthenticated,
    props.sessionTimeout,
    props.credentialInformation,
    props.lastLoginAttempt,
  ]);

  function handleLogin(e, username, password) {
    e.preventDefault();
    let data = { username, password };
    if (username === "" || password === "") {
      setMessage(translations.EMPTY_ERROR);
      return;
    } else {
      if (username.length < 6) {
        setMessage(translations.USERNAME_MIN_LENGTH_ERROR);
      } else {
        setMessage(null);
        dispatch(loginAPI(data, props.history));
      }
    }
  }

  function handleChange(e) {
    if (usernameRef.current.value !== "" || passwordRef.current.value !== ""){
      setMessage(null)
    }
  }

  return (
    <div className={classes.background}>
      <form
        onSubmit={(e) =>
          handleLogin(e, usernameRef.current.value, passwordRef.current.value)
        }
        className={classes.loginForm}
      >
        <div className="card shadow-lg mb-5">
          <div className={classes.loginHeader}>
            <Typography variant="h4" className="card-header">
              {translations.SECURITY_COMMAND_CENTER}
            </Typography>

            {message ? (
              <Alert color="error" className="m-1">
                {message}
              </Alert>
            ) : null}
          </div>

          <div className="card-body">
            <label htmlFor="username"></label>
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder={translations.USERNAME}
              autoComplete="username"
              onChange={handleChange}
              ref={usernameRef}
              autoFocus
            />
            <label htmlFor="password"></label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder={translations.PASSWORD}
              autoComplete="current-password"
              onChange={handleChange}
              ref={passwordRef}
            />

            <button
              variant="default"
              className={classes.loginBtn}
              type="submit"
            >
              {translations.LOGIN}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (props) => ({
  isAuthenticated: props.authReducer.isAuthenticated,
  credentialInformation: props.authReducer.credentialInformation,
  username: props.authReducer.username,
  sessionTimeout: props.authReducer.sessionTimeout,
  userCredential: props.authReducer.userDetail,
  lastLoginAttempt: props.authReducer.lastLoginAttempt,
});

export default connect(mapStateToProps, { loginAPI, logoutAPI, PageLoaded })(
  withTranslation()(LoginForm)
);
