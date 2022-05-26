import { Route, Switch } from "react-router-dom";
import ACDSNavigator from "../side_menu/ACDSNavigatorContainer";
import NetworkReportContainer from "../dashboard/NetworkReportContainer";
import ThreatIntelligenceContainer from "../dashboard/ThreatIntelligenceContainer";
import IncidentResponseContainer from "../dashboard/IncidentResponseContainer";
import TicketingAndAssetManagementContainer from "../dashboard/TicketingAndAssetManagementContainer";
import PolicyManagementContainer from "../dashboard/PolicyManagementContainer";
import RiskManagementContainer from "../dashboard/RiskManagementContainer";
import DashboardContainer from "../dashboard/home/DashboardContainer";
import EndpointReportContainer from "../dashboard/EndpointReportContainer";
import UnderConstructionPage from "../dashboard/components/UnderConstructionPage";
import LoginForm from "../login/LoginForm";
import Alerts from "../side_menu/Alerts";
import MultiForm from "../emulation/MainForm";
import PrivateRoute from "./PrivateRouter";
import * as CONSTANT from "../../../shared/Constants";

export default function AppRouter() {
  return (
    <>
      <Switch>
        <Route path={CONSTANT.ROUTE.LOGIN} component={LoginForm} />
        <Route
          exact
          path={CONSTANT.ROUTE.ROOT}
          component={LoginForm}
        />
        <PrivateRoute
          path={CONSTANT.ROUTE.DASHBOARD}
          component={DashboardContainer}
        />
        <PrivateRoute
          path={CONSTANT.ROUTE.NAVIGATOR}
          component={ACDSNavigator}
        />
        <PrivateRoute
          path={CONSTANT.ROUTE.NETWORK}
          component={NetworkReportContainer}
        />
        <PrivateRoute
          path={CONSTANT.ROUTE.ENDPOINT}
          component={EndpointReportContainer}
        />
        <PrivateRoute
          path={CONSTANT.ROUTE.THREAT_REPORT}
          component={ThreatIntelligenceContainer}
        />
        <PrivateRoute
          path={CONSTANT.ROUTE.SOAR}
          component={IncidentResponseContainer}
        />
        <PrivateRoute
          path={CONSTANT.ROUTE.DISCOVERY_AND_ASSETS_MANAGEMENT}
          component={TicketingAndAssetManagementContainer}
        />
        <PrivateRoute
          path={CONSTANT.ROUTE.POLICY_MANAGEMENT}
          component={PolicyManagementContainer}
        />
        <PrivateRoute
          path={CONSTANT.ROUTE.RISK_MANAGEMENT}
          component={RiskManagementContainer}
        />
        <PrivateRoute path={CONSTANT.ROUTE.ALERTS} component={Alerts} />
        <PrivateRoute path={CONSTANT.ROUTE.EMULATION} component={MultiForm} />
        <PrivateRoute
          path={CONSTANT.ROUTE.UNDER_CONSTRUCTION}
          component={UnderConstructionPage}
        />
      </Switch>
    </>
  );
}
