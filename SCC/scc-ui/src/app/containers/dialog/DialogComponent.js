import React from "react";
import i18next from "i18next";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from '@material-ui/core/Button';

export default function DialogComponent(props) {
  const LOGIN = i18next.t("LOGIN", { returnObjects: true });
  const OK = i18next.t("OK", { returnObjects: true });
  const translations = {
    SESSION_EXPIRED: LOGIN.SESSION_EXPIRED,
    OK: OK,
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.closeDialogBox}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      
    >
      <DialogContent>
        <DialogContentText color="textPrimary" id="alert-dialog-description">
          {props.message ? props.message : translations.SESSION_EXPIRED}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.logout} variant="contained" color="primary" autoFocus>{translations.OK}</Button>
      </DialogActions>
    </Dialog>
  );
}
