import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    backgroundImage: "inherit",
    background: theme.palette.tiles.main,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
  },
  dashboardTileStyles: {
    height: "15rem",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  dashboardTile: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    color: theme.palette.primary.main,
    background: theme.palette.tiles.main,
  },
}));

export { useStyles };
