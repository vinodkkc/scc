import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex"
  },
  container: {
    display: "inherit",
    maxWidth: "100%",
    paddingBottom: theme.spacing(4),
  },
  paper: {
    width: "100%",
    display: "block",
  },
  boxBtn: {
    position: "absolute",
    bottom: "6rem",
    right: "6rem"
  },
  formControl: {
    width: "14rem",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  button: {
    width: "6rem",
    margin: theme.spacing(1),
    textTransform: "none"
  },
}));

export { useStyles };
