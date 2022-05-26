import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  background: {
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundImage: `url(${theme.loginPageBackground.backgroundImage})`,
  },
  loginForm: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "25rem",
  },
  loginBtn: {
    width: "20rem",
    background: theme.palette.primary.light,
    color: theme.palette.secondary.light,
    textAlign: "center",
    alignItems: "middle",
    border: "1px",
    padding: "0.375rem 0.75rem",
    fontSize: "1rem",
    lineHeight: "1.5",
    borderRadius: "0.25rem",
    margin: theme.spacing(4, 0, 4),
  },
  forgotPassword: {
    textAlign: "right",
  },
  loginHeader: {
    textAlign: "center",
  },
}));
