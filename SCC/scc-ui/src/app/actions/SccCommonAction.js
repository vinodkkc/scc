import { COMMON_ACTION } from "./constants/ActionType";

export function PageLoading() {
    return (dispatch) => {
      dispatch({ type: COMMON_ACTION.PAGE_LOADING });
    }
}

export function PageLoaded() {
    return (dispatch) => {
      dispatch({ type: COMMON_ACTION.PAGE_LOADED});
    }
}