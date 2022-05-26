import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../style/DashboardContentStyle";

export default function DashboardTile(props) {
  const classes = useStyles();
  const { handleComponentPosition, data } = props;
  return (
    <>
      <Typography variant="h5">
        <Link
          className={classes.dashboardTile}
          to={data.element.route}
          onClick={handleComponentPosition}
        >
          {data.element.subTitle}
        </Link>
      </Typography>
    </>
  );
}
