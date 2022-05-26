import { makeStyles } from "@material-ui/core/styles";
import { footerHeight } from "../footer/style/FooterStyle";
import { headerHeight } from "../header/style/HeaderStyle";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: headerHeight,
    paddingLeft: theme.spacing(7),
    paddingBottom: footerHeight,
    position: "absolute",
    height: "100%",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(9),
    },
  },
  mainContainer: {
    backgroundColor: theme.palette.mainContainer.primary,
    height: "100%",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    backgroundColor: "inherit",
    background: "inherit",
    backgroundImage: "inherit",
  },
  paper: {
    padding: theme.spacing(2),
    overflow: "auto",
    background: theme.palette.tiles.main,
  },
  iframe: {
    height: "100%",
    width: "100%",
  }
}));

export { useStyles };
