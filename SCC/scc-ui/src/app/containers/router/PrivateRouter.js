import React, { useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useStyles } from "../styles/Style";
import * as CONSTANT from "../../../shared/Constants";
import { connect } from "react-redux";
import SideMenu from "../side_menu/SideMenu";
import Header from "../header/Header";
import DialogComponent from "../dialog/DialogComponent";
import store from "../../store/Store";
import { logoutAPI } from "../../actions/authentication/AuthAction";

function PrivateRoute({
  component: Component,
  isAuthenticated,
  userCredential,
  sessionTimeout,
  isLoading,
  ...rest
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const openDialogBox = () => {
    setOpen(true);
  };

  const closeDialogBox = () => {
    setOpen(false);
  };

  const logout = () => {
    if (userCredential) {
      store.dispatch(logoutAPI(userCredential, history));
    } else {
      history.replace(CONSTANT.ROUTE.LOGIN);
    }
    closeDialogBox();
  };

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          return isAuthenticated && Date.parse(new Date()) < sessionTimeout ? (
            <>
              <Header />
              <SideMenu />
              
              <div className={classes.content}>
                <Component {...props} />
              </div>
            </>
          ) : isAuthenticated ? (
            <>
              <DialogComponent
                open={open}
                closeDialogBox={closeDialogBox}
                openDialogBox={openDialogBox}
                logout={logout}
              ></DialogComponent>
            </>
          ) : (
            <Redirect to={CONSTANT.ROUTE.LOGIN} />
          );
        }}
      ></Route>
    </>
  );
}

const mapStateToProps = (props) => ({
  isAuthenticated: props.authReducer.isAuthenticated,
  sessionTimeout: props.authReducer.sessionTimeout,
  userCredential: props.authReducer.userDetail,
});

export default connect(mapStateToProps, { logoutAPI })(PrivateRoute);
