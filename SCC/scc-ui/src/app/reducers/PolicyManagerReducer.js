import { POLICY_MANAGER } from "../actions/constants/ActionType";

const initialState = {
  component: "",
  policies: {
    anonymize: "",
    purgeDataOlderThanDays: ""
  },
  message: null
};

export const policyManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case POLICY_MANAGER.FETCH_POLICY_SUCCESS:
      return {
        ...state,
        ...action.payload,
        component: action.payload.component,
        policies: {
          anonymize: action.payload.policies.anonymize,
          purgeDataOlderThanDays: action.payload.policies.purgeDataOlderThanDays
        },
        message: null
      };

    case POLICY_MANAGER.FETCH_POLICY_FAIL:
      return {
        ...state,
        ...action.payload,
        component: "",
        policies: {
          anonymize: "",
          purgeDataOlderThanDays: ""
        },
        message: action.payload.message,
      };

    case POLICY_MANAGER.FETCH_POLICY_SERVER_ERROR:
      return {
        ...state,
        ...action.payload,
        component: "",
        policies: {
          anonymize: "",
          purgeDataOlderThanDays: ""
        },
        message: action.payload.message,
      };

    case POLICY_MANAGER.STORE_POLICY_SUCCESS:
      return {
        ...state,
        ...action.payload,
        component: action.payload.component,
        policies: {
          anonymize: action.payload.policies.anonymize,
          purgeDataOlderThanDays: action.payload.policies.purgeDataOlderThanDays
        },
        message: action.payload.message,
      };

    case POLICY_MANAGER.STORE_POLICY_FAIL:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
      };

    case POLICY_MANAGER.STORE_POLICY_SERVER_ERROR:
      return {
        ...state,
        ...action.payload,
        message: action.payload.message,
      };

    case POLICY_MANAGER.RESET_DIALOG_MESSAGE:
      return {
        ...state,
        message: null
      };

    default:
      return state;
  }
};
