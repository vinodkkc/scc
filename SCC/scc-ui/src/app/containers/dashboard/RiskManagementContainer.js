import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import i18next from "i18next";
import * as CONSTANT from "../../../shared/Constants";
import clsx from "clsx";
import { useStyles } from "./style/RiskManagementStyle";
import { useStyles as rootStyles } from "../styles/Style";

export default function RiskManagementContainer() {
  const classes = useStyles();
  const rootClasses = rootStyles();
  const mainContainer = clsx(classes.mainContainer, rootClasses.mainContainer);

  const RISK_MANAGEMENT = i18next.t("RISK_MANAGEMENT", { returnObjects: true });
  const translations = {
    RISK_REPORT: RISK_MANAGEMENT.RISK_REPORT,
    COMPLIANCE_REPORT: RISK_MANAGEMENT.COMPLIANCE_REPORT,
    VULNERABILITY_REPORT: RISK_MANAGEMENT.VULNERABILITY_REPORT
  };
  const [value, setValue] = useState(0);

  const riskReportUrl = window._env_.REACT_APP_RISK_REPORT_URL || process.env.REACT_APP_RISK_REPORT_URL;
  const configComplianceReportUrl = window._env_.REACT_APP_CONFIG_COMPLIANCE_REPORT_URL || process.env.REACT_APP_CONFIG_COMPLIANCE_REPORT_URL;
  const vulnerabilityReportUrl = window._env_.REACT_APP_VULNERABILITY_REPORT_URL || process.env.REACT_APP_VULNERABILITY_REPORT_URL;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        {...other}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Typography className={classes.typography}>{children}</Typography>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function activeIndex(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <div className={mainContainer}>
        <Box className={classes.box}>
          <Tabs
            textColor="secondary"
            value={value}
            onChange={handleChange}
            classes={{ indicator: classes.indicator }}
          >
            <Tab className={classes.tab} classes={{ selected: classes.selectedTab }} label={translations.RISK_REPORT} {...activeIndex(0)} />
            <Tab className={classes.tab} classes={{ selected: classes.selectedTab }} label={translations.COMPLIANCE_REPORT} {...activeIndex(1)} />
            <Tab className={classes.tab} classes={{ selected: classes.selectedTab }} label={translations.VULNERABILITY_REPORT} {...activeIndex(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} className={classes.tabpanel}>
          <iframe
            src={riskReportUrl}
            className={rootClasses.iframe}
            title={CONSTANT.IFRAME.RISK_REPORT}
          ></iframe>
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.tabpanel}>
          <iframe
            src={configComplianceReportUrl}
            className={rootClasses.iframe}
            title={CONSTANT.IFRAME.COMPLIANCE_REPORT}
          ></iframe>
        </TabPanel>
        <TabPanel value={value} index={2} className={classes.tabpanel}>
          <iframe
            src={vulnerabilityReportUrl}
            className={rootClasses.iframe}
            title={CONSTANT.IFRAME.VULNERABILITY_REPORT}
          ></iframe>
        </TabPanel>
      </div>
    </>
  );
}
