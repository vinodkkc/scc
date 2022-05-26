import React from "react";
import { useStyles } from "../styles/Style";
import * as CONSTANT from "../../../shared/Constants";

export default function EndpointReportContainer() {
  const classes = useStyles();
  const endpointDashboardUrl = window._env_.REACT_APP_ENDPOINT_DASHBOARD_URL || process.env.REACT_APP_ENDPOINT_DASHBOARD_URL;
  return (
      <iframe
        src={endpointDashboardUrl}
        className={classes.iframe}
        title={CONSTANT.IFRAME.NETWORK}
      ></iframe>
  );
}
