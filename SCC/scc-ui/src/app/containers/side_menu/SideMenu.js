import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./style/SideMenuStyle";
import SideMenuData from "../../../shared/SideMenuData";
import { connect } from "react-redux";

function SideMenu(props) {
  const classes = useStyles();
  const items = SideMenuData();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const sideMenu = (
    <>
      <Drawer
        onMouseLeave={handleDrawerClose}
        onMouseEnter={handleDrawerOpen}
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}></div>
        <div className={classes.toolbarIcon}></div>
        <Divider />
        <List>
          {items.map(({ label, name, iconComponent, route, ...rest }) => (
            <ListItem key={name} button {...rest} tabIndex="-1">
            <Link to={route}>
              <ListItemIcon>{iconComponent}</ListItemIcon>
            </Link>
              <Typography variant="h6">
                <Link
                  tabIndex="-1"
                  className={classes.drawerPaper}
                  onClick={handleDrawerClose}
                  to={route}
                  {...rest}
                >
                  {label}
                </Link>
              </Typography>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );

  return <div>{props.isAuthenticated ? sideMenu : ""}</div>;
}

const mapStateToProps = (props) => ({
  isAuthenticated: props.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(SideMenu);
