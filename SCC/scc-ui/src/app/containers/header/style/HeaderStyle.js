import { makeStyles } from "@material-ui/core/styles";

const headerHeight = "3.75rem";
const useStyles = makeStyles((theme) => ({
  navHeader: {
    position: "fixed",
    height: headerHeight,
    width: "100%",
    backgroundImage: theme.palette.header.mainGradient,
    zIndex: 9900,
  },
  navHeaderNotification: {
    color: "grey",
    marginLeft: 10,
    marginRight: 10,
  },
}));

export { useStyles };
export { headerHeight };
