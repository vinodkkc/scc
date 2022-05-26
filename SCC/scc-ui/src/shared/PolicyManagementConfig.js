import i18next from "i18next";
import { POLICY_MANAGEMENT as CONSTANT } from "./Constants";

function PolicyManagementConfig() {

  const POLICY_MANAGEMENT = i18next.t("POLICY_MANAGEMENT", { returnObjects: true });
  const translations = {
    TIP: POLICY_MANAGEMENT.TIP,
    TRUE: POLICY_MANAGEMENT.TRUE,
    FALSE: POLICY_MANAGEMENT.FALSE,
  };

  const policyManagementConfig = {
    component: [
      {
        value: CONSTANT.TIP,
        label: translations.TIP,
      },
    ],
    anonymize: [
      {
        value: CONSTANT.TRUE,
        label: translations.TRUE,
      },
      {
        value: CONSTANT.FALSE,
        label: translations.FALSE,
      },
    ],
  };

  return policyManagementConfig;
}
export default PolicyManagementConfig;
