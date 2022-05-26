import React, { useState, useEffect } from "react";
import PolicyManagementConfig from "../../../shared/PolicyManagementConfig";
import { POLICY_MANAGEMENT as CONSTANT } from "../../../shared/Constants";
import i18next from "i18next";
import DialogComponent from "../dialog/DialogComponent";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { useStyles as rootStyles } from "../styles/Style";
import { useStyles } from "./style/PolicyManagementStyle";
import { fetchPolicyAPI, storePolicyAPI, resetMessage } from "../../actions/policy_management/PolicyManagerAction";
import { connect, useDispatch } from "react-redux";

function PolicyManagementContainer(props) {

  const dispatch = useDispatch();
  const classes = useStyles();
  const rootClasses = rootStyles();
  const mainContainer = clsx(classes.mainContainer, rootClasses.mainContainer);
  const container = clsx(classes.container, rootClasses.container);
  const paper = clsx(classes.paper, rootClasses.paper);
  const policyManagementConfig = PolicyManagementConfig();
  const POLICY_MANAGEMENT = i18next.t("POLICY_MANAGEMENT", { returnObjects: true });
  const translations = {
    POLICY_MANAGER_DETAILS: POLICY_MANAGEMENT.POLICY_MANAGER_DETAILS,
    COMPONENT: POLICY_MANAGEMENT.COMPONENT,
    ANONYMIZE: POLICY_MANAGEMENT.ANONYMIZE,
    PURGE_DATA_OLDER_THAN: POLICY_MANAGEMENT.PURGE_DATA_OLDER_THAN,
    SELECT: POLICY_MANAGEMENT.SELECT,
    DAYS: POLICY_MANAGEMENT.DAYS,
    SAVE: POLICY_MANAGEMENT.SAVE,
    CANCEL: POLICY_MANAGEMENT.CANCEL,
    REQUIRED_FIELD: POLICY_MANAGEMENT.REQUIRED_FIELD,
    ONLY_NUMBERS_PERMITTED: POLICY_MANAGEMENT.ONLY_NUMBERS_PERMITTED,
    SUCCESS_MESSAGE: POLICY_MANAGEMENT.SUCCESS_MESSAGE,
    SERVER_ERROR_MESSAGE: POLICY_MANAGEMENT.SERVER_ERROR_MESSAGE,
    INVALID_DATA_MESSAGE: POLICY_MANAGEMENT.INVALID_DATA_MESSAGE,
    FETCH_POLICY_FAILED: POLICY_MANAGEMENT.FETCH_POLICY_FAILED
  };
  
  useEffect(() => {
    let message = {
      fetchPolicyFailed: translations.FETCH_POLICY_FAILED,
      serverErrorMessage: translations.SERVER_ERROR_MESSAGE
    }
    dispatch(fetchPolicyAPI(message));
  }, []);

  const [component, setComponent] = useState("");
  const initialPolicies = {
    anonymize: "",
    purgeDataOlderThanDays: "",
  };
  const [policies, setPolicies] = useState(initialPolicies);

  useEffect(() => {
    setComponent(props.component);
    setPolicies({
      anonymize: props.policies.anonymize,
      purgeDataOlderThanDays: props.policies.purgeDataOlderThanDays,
    });
  }, [props.component, props.policies]);

  const handleComponentChange = (e) => {
    setComponent(e.target.value)
  };

  const handlePolicyChange = (e) => {
    setPolicies({
      ...policies,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let message = {
        successMessage: translations.SUCCESS_MESSAGE,
        invalidDataMessage: translations.INVALID_DATA_MESSAGE,
        serverErrorMessage: translations.SERVER_ERROR_MESSAGE
      }
      dispatch(storePolicyAPI(component, policies, message));
    }
  };

  const handleRedirect = () => {
    window.location.href = "/scc";
  };

  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(null);

  useEffect(() => {
    openDialogBox();
  }, [props.message]);

  const openDialogBox = () => {
    if (props.message !== null) {
      setDialogMessage(props.message)
      setOpen(true);
    }
  };

  const closeDialogBox = () => {
    setOpen(false);
    dispatch(resetMessage());
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    let errMessage = {};
    errMessage.component =
      component.length !== 0 ? "" : translations.REQUIRED_FIELD;
    errMessage.anonymize =
      policies.anonymize !== "" ? "" : translations.REQUIRED_FIELD;
    errMessage.purgeDataOlderThanDays =
      policies.purgeDataOlderThanDays.length !== 0
        ? new RegExp(/^\d*$/).test(policies.purgeDataOlderThanDays)
          ? ""
          : translations.ONLY_NUMBERS_PERMITTED
        : translations.REQUIRED_FIELD;
    setErrors({
      ...errMessage,
    });
    return Object.values(errMessage).every((e) => e === "");
  };
  
  
  return (
    <>
      <div className={mainContainer}>
        <Container className={container}>
          <Paper className={paper}>
            <Typography variant="h5">
              {translations.POLICY_MANAGER_DETAILS}
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit}>
            
            <FormControl
                error={errors.component ? true : false}
                className={classes.formControl}
                variant="outlined"
              >
                <InputLabel>
                  {translations.COMPONENT}
                </InputLabel>
                <Select
                  label={translations.COMPONENT}
                  name={CONSTANT.COMPONENT}
                  value={component}
                  onChange={handleComponentChange}
                >
                  <MenuItem value="" >
                    {translations.SELECT}
                  </MenuItem>
                  {policyManagementConfig.component.map((option) => (
                    <MenuItem key={option.value} value={option.value} >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors && (
                  <FormHelperText>{errors.component}</FormHelperText>
                )}
              </FormControl>
              
              <FormControl
                error={errors.anonymize ? true : false}
                className={classes.formControl}
                variant="outlined"
              >
                <InputLabel>
                  {translations.ANONYMIZE}
                </InputLabel>
                <Select
                  label={translations.ANONYMIZE}
                  name={CONSTANT.ANONYMIZE}
                  value={policies.anonymize}
                  onChange={handlePolicyChange}
                >
                  <MenuItem value="" >
                    {translations.SELECT}
                  </MenuItem>
                  {policyManagementConfig.anonymize.map((option) => (
                    <MenuItem key={option.value} value={option.value} >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors && (
                  <FormHelperText>{errors.anonymize}</FormHelperText>
                )}
              </FormControl>
              
              <FormControl
                error={errors.purgeDataOlderThanDays ? true : false}
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel>
                  {translations.PURGE_DATA_OLDER_THAN}
                </InputLabel>
                <OutlinedInput
                  value={policies.purgeDataOlderThanDays}
                  name={CONSTANT.PURGE_DATA_OLDER_THAN_DAYS}
                  label={translations.PURGE_DATA_OLDER_THAN}
                  endAdornment={
                    <InputAdornment position="end">
                      {translations.DAYS}
                    </InputAdornment>
                  }
                  onChange={handlePolicyChange}
                />
                {errors && <FormHelperText>{errors.purgeDataOlderThanDays}</FormHelperText>}
              </FormControl>
              
              
              <Box
                className={classes.boxBtn}
              >
                <Button
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  value={CONSTANT.SAVE}
                  type="submit"
                >
                  {translations.SAVE}
                </Button>

                <Button
                  className={classes.button}
                  variant="outlined"
                  value={CONSTANT.CANCEL}
                  onClick={handleRedirect}
                >
                  {translations.CANCEL}
                </Button>
              </Box>
              
              <DialogComponent
                open={open}
                message={dialogMessage}
                closeDialogBox={closeDialogBox}
                openDialogBox={openDialogBox}
                logout={closeDialogBox}
              >
              </DialogComponent>
              
              </form>
          </Paper>
        </Container>
      </div>
    </>
  );
}

const mapStateToProps = (props) => ({
  component: props.policyManagerReducer.component,
  policies: {
    anonymize: props.policyManagerReducer.policies.anonymize,
    purgeDataOlderThanDays: props.policyManagerReducer.policies.purgeDataOlderThanDays
  },
  message: props.policyManagerReducer.message
});

export default connect(mapStateToProps, { fetchPolicyAPI, storePolicyAPI, resetMessage })(
  (PolicyManagementContainer)
);