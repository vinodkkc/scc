import { makeStyles } from "@material-ui/core/styles";

const tabHeight = "3rem";
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
  },
  tab: {
    textTransform: "none",
    fontSize: "1rem",
  },
  indicator: {
    backgroundColor: theme.palette.secondary.main,
  },
  selectedTab: {
    color: theme.palette.secondary.main,
  },
  tabpanel: {
    paddingTop: tabHeight,
    width: "100%",
  },
  typography: {
    display: "inline",
  },
  box: {
    position: "fixed",
    width: "100%",
    backgroundColor: theme.palette.tiles.main
  }
}))
export { useStyles };