import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import React from "react";
import DashboardTile from "../components/DashboardTile";
import NoData from "../components/NoData";
import { useStyles as rootStyles } from "../../styles/Style";
import { useStyles } from "../style/DashboardContentStyle";
import TilesData from "../../../../shared/TilesData";

export default function DashboardContainer() {
  const classes = useStyles();
  const rootClasses = rootStyles();
  const handleComponentPosition = () => {};
  const tilesData = TilesData();
  const tileStyle = clsx(rootClasses.paper, classes.paper, classes.dashboardTileStyles);

  return (
    <div className={rootClasses.mainContainer}>
      <Container maxWidth="xl" className={rootClasses.container}>
        <Grid container spacing={2}>
          {tilesData !== undefined ? (
            tilesData.map((element, index) => {
              if (element.isShown) {
                return (
                  <Grid item xs={12} md={4} lg={3} xl={2} key={index}>
                    <Paper className={tileStyle}>
                      <DashboardTile
                        handleComponentPosition={handleComponentPosition}
                        data={{ element }}
                      />
                    </Paper>
                  </Grid>
                );
              } else {
                return null;
              }
            })
          ) : (
            <NoData />
          )}
        </Grid>
      </Container>
    </div>
  );
}
