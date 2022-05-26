import AssignmentIcon from "@material-ui/icons/Assignment";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LayersIcon from "@material-ui/icons/Layers";
import PeopleIcon from "@material-ui/icons/People";
// import SecurityIcon from "@material-ui/icons/Security";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import i18next from "i18next";
import * as CONSTANT from "../shared/Constants";

function SideMenuData() {
  const SIDEMENUDATA = i18next.t("SIDEMENUDATA", { returnObjects: true });

  const translations = {
    DASHBOARD: SIDEMENUDATA.DASHBOARD,
    ATTACK_EMULATION: SIDEMENUDATA.ATTACK_EMULATION,
    USERS: SIDEMENUDATA.USERS,
    AUDIT_LOGS: SIDEMENUDATA.AUDIT_LOGS,
    CONFIGURATIONS: SIDEMENUDATA.CONFIGURATIONS,
    ACDS_NAVIGATOR: SIDEMENUDATA.ACDS_NAVIGATOR,
    ALERTS: SIDEMENUDATA.ALERTS,
  };

  const sideMenuData = [
    {
      name: CONSTANT.SIDEMENUDATA.DASHBOARD,
      label: translations.DASHBOARD,
      iconComponent: <DashboardIcon />,
      route: CONSTANT.ROUTE.DASHBOARD,
    },
    // {
    //   name: CONSTANT.SIDEMENUDATA.ATTACK_EMULATION,
    //   label: translations.ATTACK_EMULATION,
    //   iconComponent: <SecurityIcon />,
    //   route: CONSTANT.ROUTE.EMULATION,
    // },
    {
      name: CONSTANT.SIDEMENUDATA.ALERTS,
      label: translations.ALERTS,
      iconComponent: <AddAlertIcon />,
      route: CONSTANT.ROUTE.ALERTS,
    },
    {
      name: CONSTANT.SIDEMENUDATA.ACDS_NAVIGATOR,
      label: translations.ACDS_NAVIGATOR,
      iconComponent: <BarChartIcon />,
      route: CONSTANT.ROUTE.NAVIGATOR,
    },
    {
      name: CONSTANT.SIDEMENUDATA.USERS,
      label: translations.USERS,
      iconComponent: <PeopleIcon />,
      route: CONSTANT.ROUTE.UNDER_CONSTRUCTION,
    },
    {
      name: CONSTANT.SIDEMENUDATA.AUDIT_LOGS,
      label: translations.AUDIT_LOGS,
      iconComponent: <LayersIcon />,
      route: CONSTANT.ROUTE.UNDER_CONSTRUCTION,
    },
    {
      name: CONSTANT.SIDEMENUDATA.CONFIGURATIONS,
      label: translations.CONFIGURATIONS,
      iconComponent: <AssignmentIcon />,
      route: CONSTANT.ROUTE.UNDER_CONSTRUCTION,
    },
  ];

  return sideMenuData;
}
export default SideMenuData;
