import i18next from "i18next";
import * as CONSTANT from "../shared/Constants";

function TilesData() {
  const DASHBOARDTILE = i18next.t("DASHBOARDTILE", { returnObjects: true });
  const translations = {
    TYPE_OF_NETWORK: DASHBOARDTILE.TYPE_OF_NETWORK,
    NETWORK_SECURITY: DASHBOARDTILE.NETWORK_SECURITY,
    SUPPORTED_TECHNIQUE: DASHBOARDTILE.SUPPORTED_TECHNIQUE,
    RED_BLUE_TEAM: DASHBOARDTILE.RED_BLUE_TEAM,
    SUPPORTED_DETECTION: DASHBOARDTILE.SUPPORTED_DETECTION,
    ENDPOINT_SECURITY: DASHBOARDTILE.ENDPOINT_SECURITY,
    MISP_INFORMATION: DASHBOARDTILE.MISP_INFORMATION,
    THREAT_INTELLIGENCE: DASHBOARDTILE.THREAT_INTELLIGENCE,
    THREAT_HUNTING: DASHBOARDTILE.THREAT_HUNTING,
    TOTAL_RISK: DASHBOARDTILE.TOTAL_RISK,
    RISK_MANAGEMENT: DASHBOARDTILE.RISK_MANAGEMENT,
    NO_OF_TICKETS: DASHBOARDTILE.NO_OF_TICKETS,
    TICKETING: DASHBOARDTILE.TICKETING,
    DISCOVERY_AND_ASSETS: DASHBOARDTILE.DISCOVERY_AND_ASSETS,
    TICKETING_AND_ASSETS_MGMT: DASHBOARDTILE.TICKETING_AND_ASSETS_MGMT,
    SIMULATIONS: DASHBOARDTILE.SIMULATIONS,
    OEM_VISIBILITY: DASHBOARDTILE.OEM_VISIBILITY,
    OEM: DASHBOARDTILE.OEM,
    POLICIES: DASHBOARDTILE.POLICIES,
    POLICY_MGMT: DASHBOARDTILE.POLICY_MGMT,
    INCIDENTS: DASHBOARDTILE.INCIDENTS,
    SOAR: DASHBOARDTILE.SOAR,
  };

  const tilesData = [
    {
      title: translations.TYPE_OF_NETWORK,
      subTitle: translations.NETWORK_SECURITY,
      route: CONSTANT.ROUTE.NETWORK,
      isShown: true,
    },
    {
      title: translations.SUPPORTED_DETECTION,
      subTitle: translations.ENDPOINT_SECURITY,
      route: CONSTANT.ROUTE.ENDPOINT,
      isShown: true,
    },
    {
      title: translations.MISP_INFORMATION,
      subTitle: translations.THREAT_INTELLIGENCE,
      route: CONSTANT.ROUTE.THREAT_REPORT,
      isShown: true,
    },
    {
      title: translations.TOTAL_RISK,
      subTitle: translations.RISK_MANAGEMENT,
      route: CONSTANT.ROUTE.RISK_MANAGEMENT,
      isShown: true,
    },
    {
      title: translations.DISCOVERY_AND_ASSETS,
      subTitle: translations.TICKETING_AND_ASSETS_MGMT,
      route: CONSTANT.ROUTE.DISCOVERY_AND_ASSETS_MANAGEMENT,
      isShown: true,
    },
    {
      title: translations.POLICIES,
      subTitle: translations.POLICY_MGMT,
      route: CONSTANT.ROUTE.POLICY_MANAGEMENT,
      isShown: true,
    },
    {
      title: translations.INCIDENTS,
      subTitle: translations.SOAR,
      route: CONSTANT.ROUTE.SOAR,
      isShown: true,
    },
  ];

  return tilesData;
}
export default TilesData;
