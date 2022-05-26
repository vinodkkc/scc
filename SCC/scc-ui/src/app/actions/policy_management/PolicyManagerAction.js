import axios from "axios";
import { POLICY_MANAGER } from "../constants/ActionType";
import { PageLoading, PageLoaded } from "../SccCommonAction";

const policyManagerUrl = window._env_.REACT_APP_POLICY_MANAGER_API_SERVER || process.env.REACT_APP_POLICY_MANAGER_API_SERVER;

export function fetchPolicyAPI(message) {

  const FETCH_POLICY_API = "/FetchPolicy/tip";
  return (dispatch) => {
    dispatch(PageLoading());
    axios.get(policyManagerUrl + FETCH_POLICY_API, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "*/*",
      },
    })
      .then((response) => {
        if (response) {
          if (response.data.status === "SUCCESS") {
            dispatch({
              type: POLICY_MANAGER.FETCH_POLICY_SUCCESS,
              payload: {
                component: response.data.payload.component,
                policies: {
                  anonymize: response.data.payload.policies.anonymize,
                  purgeDataOlderThanDays: response.data.payload.policies.purge_data_older_than_days,
                },
              },
            });
            dispatch(PageLoaded());
          } else {
            dispatch({
              type: POLICY_MANAGER.FETCH_POLICY_FAIL,
              payload: {
                message: message.fetchPolicyFailed
              }
            });
            dispatch(PageLoaded());
          }
        } else {
          dispatch({
            type: POLICY_MANAGER.FETCH_POLICY_SERVER_ERROR,
            payload: {
              message: message.serverErrorMessage
            }
          });
          dispatch(PageLoaded());
        }
      })
      .catch((err) => {
        dispatch({
          type: POLICY_MANAGER.FETCH_POLICY_SERVER_ERROR,
          payload: {
            message: message.serverErrorMessage
          }
        });
        dispatch(PageLoaded());
      });
  };
}

export function storePolicyAPI(component, policies, message) {

  const STORE_POLICY_API = "/StorePolicy/tip";
  let purgeDataOlderThanDays = parseInt(policies.purgeDataOlderThanDays, 10);
  return (dispatch) => {
    dispatch(PageLoading());
    axios
      .post(
        policyManagerUrl + STORE_POLICY_API,
        {
          policies: {
            anonymize: policies.anonymize,
            purge_data_older_than_days: purgeDataOlderThanDays,
          },
          component: component,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Accept: "*/*",
          },
        }
      )
      .then((response) => {
        if (response) {
          if (response.data.status === "SUCCESS") {
            dispatch({
              type: POLICY_MANAGER.STORE_POLICY_SUCCESS,
              payload: {
                component: component,
                policies: {
                  anonymize: policies.anonymize,
                  purgeDataOlderThanDays: purgeDataOlderThanDays,
                },
                message: message.successMessage
              },
            });
            dispatch(PageLoaded());
          } else {
            dispatch({
              type: POLICY_MANAGER.STORE_POLICY_FAIL,
              payload: {
                message: message.invalidDataMessage
              }
            });
            dispatch(PageLoaded());
          }
        } else {
          dispatch({
            type: POLICY_MANAGER.STORE_POLICY_SERVER_ERROR,
            payload: {
              message: message.serverErrorMessage
            }
          });
          dispatch(PageLoaded());
        }
      })
      .catch((error) => {
        dispatch({
          type: POLICY_MANAGER.STORE_POLICY_SERVER_ERROR,
          payload: {
            message: message.serverErrorMessage
          }
        });
        dispatch(PageLoaded());
      });
  };
}

export const resetMessage = () => {
  return {
    type: POLICY_MANAGER.RESET_DIALOG_MESSAGE,
  };
};

