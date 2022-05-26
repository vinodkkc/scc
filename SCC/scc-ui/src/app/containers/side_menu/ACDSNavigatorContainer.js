import React from "react";
// import UnderConstructionPage from "../dashboard/components/UnderConstructionPage";
import { useStyles } from "../styles/Style";
import * as CONSTANT from "../../../shared/Constants";

export default function ACDSNavigator() {
  const classes = useStyles();
  const navigatorUrl = window._env_.REACT_APP_ATTACK_NAVIGATOR_URL || process.env.REACT_APP_ATTACK_NAVIGATOR_URL;
  console.log("navigatorUrl:: ", navigatorUrl);

  return (
      <iframe
        src={navigatorUrl}
        className={classes.iframe}
        title={CONSTANT.IFRAME.ACDS_NAVIGATOR}
      ></iframe>
  );

}
