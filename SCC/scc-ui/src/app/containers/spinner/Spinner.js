import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useStyles } from "./style/SpinnerStyle";
import { connect } from "react-redux";

function Spinner(props) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backDrop} open={props.isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

const mapStateToProps = (props) => ({
  isLoading: props.sccCommonReducer.isLoading,
});

export default connect(mapStateToProps,)(Spinner);
