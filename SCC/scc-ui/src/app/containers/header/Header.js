import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import i18next from "i18next";
import React from "react";
import { useStyles } from "./style/HeaderStyle";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logoutAPI } from "../../actions/authentication/AuthAction";
import { useHistory } from "react-router-dom";

function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const HEADER = i18next.t("HEADER", { returnObjects: true });
  const COMMON = i18next.t("COMMON", { returnObjects: true });

  const translations = {
    SECURITY_COMMAND_CENTER: COMMON.SECURITY_COMMAND_CENTER,
    HELLO: HEADER.HELLO,
    LOGOUT: HEADER.LOGOUT,
    ENGLISH: HEADER.ENGLISH,
    PORTUGUESE: HEADER.PORTUGUESE,
  };

  const handleLogout = () => {
    props.logoutAPI(props.userCredential, history);
  };

  const handleClick = () => {};

  const navHeader = (
    <>
      <div className={classes.navHeader}>
        <nav className="navbar navbar-expand navbar-dark">
          <div className="container-fluid">
            <button
              className="navbar-brand btn btn-link"
              type="button"
              onClick={handleClick}
            >
              {translations.SECURITY_COMMAND_CENTER}
            </button>
          </div>
          <div
            className=" navbar-collapse float-right "
            id="navbarSupportedContent"
          >
            <form className="d-flex">
              <div className="dropdown">
                <button
                  className="btn text-light dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {translations.HELLO}{" "}
                  {props.isAuthenticated ? props.username : ""}
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button
                    className="dropdown-item btn btn-link"
                    type="button"
                    onClick={handleLogout}
                  >
                    {translations.LOGOUT}
                  </button>
                </div>
              </div>
            </form>
            <NotificationsActiveIcon
              className={classes.navHeaderNotification}
            />
          </div>
        </nav>
      </div>
    </>
  );
  return <div>{props.isAuthenticated ? navHeader : ""}</div>;
}

const LanguageToggler = () => {
  const { i18n } = useTranslation();
  const HEADER = i18next.t("HEADER", { returnObjects: true });
  const translations = {
    ENGLISH: HEADER.ENGLISH,
    PORTUGUESE: HEADER.PORTUGUESE,
  };

  return (
    <>
      <div className="dropdown">
        <button
          className="btn text-light dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {HEADER.CHOOSE_LANG}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button
            className="dropdown-item btn btn-link"
            type="button"
            onClick={() => i18n.changeLanguage("en")}
          >
            {translations.ENGLISH}
          </button>
          <button
            className="dropdown-item btn btn-link"
            type="button"
            onClick={() => i18n.changeLanguage("pt")}
          >
            {translations.PORTUGUESE}
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (props) => ({
  isAuthenticated: props.authReducer.isAuthenticated,
  username: props.authReducer.username,
  userCredential: props.authReducer.userDetail,
});

export default connect(mapStateToProps, { logoutAPI })(Header);
