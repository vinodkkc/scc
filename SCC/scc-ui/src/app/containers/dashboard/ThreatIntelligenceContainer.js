import React from "react";
import { useStyles } from "../styles/Style";
import * as CONSTANT from "../../../shared/Constants";

export default function ThreatIntelligenceContainer() {
  const classes = useStyles();
  const tipUrl = window._env_.REACT_APP_MISP_URL || process.env.REACT_APP_MISP_URL;
  return (
      <iframe
        src={tipUrl}
        className={classes.iframe}
        title={CONSTANT.IFRAME.THREAT_REPORT}
      ></iframe>
  );
}
