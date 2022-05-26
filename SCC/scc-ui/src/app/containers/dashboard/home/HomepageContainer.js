import React from "react";
import AppRouter from "../../router/Router";
import { useStyles } from "../style/DashboardContentStyle";
import Footer from "../../footer/Footer";

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppRouter />
      <Footer />
    </div>
  );
}

export default Dashboard;
