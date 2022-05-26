import React from "react";
import {useStyles} from "../styles/Style"
import * as CONSTANT from "../../../shared/Constants";

export default function IncidentResponseContainer() {
  const classes = useStyles();
  const soarUrl = window._env_.REACT_APP_SOAR_URL || process.env.REACT_APP_SOAR_URL;
  console.log("soarUrl:: ", soarUrl);

  return (
      <iframe
        src={soarUrl}
        className={classes.iframe}
        title={CONSTANT.IFRAME.SOAR}
      ></iframe>
  );
};