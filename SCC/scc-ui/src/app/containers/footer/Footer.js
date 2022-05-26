import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import i18next from "i18next";
import React from "react";
import { withTranslation } from "react-i18next";
import { useStyles } from "./style/FooterStyle";

class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    const FOOTER = i18next.t("FOOTER", { returnObjects: true });
    const COMMON = i18next.t("COMMON", { returnObjects: true });
    const translations = {
      SECURITY_COMMAND_CENTER: COMMON.SECURITY_COMMAND_CENTER,
      COPYRIGHT: FOOTER.COPYRIGHT,
    };
    return (
      <div className={classes.footer}>
        <Typography variant="h6">
          {translations.COPYRIGHT}
          <a variant="body2" className={classes.footeraTag} href="/">
            {translations.SECURITY_COMMAND_CENTER}
          </a>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    );
  }
}
export default withTranslation()(withStyles(useStyles)(Footer));
