import React from "react";
import {useStyles} from "../styles/Style"
import * as CONSTANT from "../../../shared/Constants";

export default function NetworkReportContainer() {
  const classes = useStyles();
  const networkDashboardUrl = window._env_.REACT_APP_NETWORK_DASHBOARD_URL || process.env.REACT_APP_NETWORK_DASHBOARD_URL;
  return (
      <iframe
        src={networkDashboardUrl}
        className={classes.iframe}
        title={CONSTANT.IFRAME.DETECTION}
      ></iframe>
  );
}
