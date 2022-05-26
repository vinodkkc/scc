import { useStyles } from "../styles/Style";
import * as CONSTANT from "../../../shared/Constants";
export default function Alerts() {
  const classes = useStyles();
  const soAlertsUrl = window._env_.REACT_APP_SO_ALERTS_URL || process.env.REACT_APP_SO_ALERTS_URL;
  return (
    <iframe
      src={soAlertsUrl}
      className={classes.iframe}
      title={CONSTANT.IFRAME.DETECTION}
    ></iframe>
  );
}
