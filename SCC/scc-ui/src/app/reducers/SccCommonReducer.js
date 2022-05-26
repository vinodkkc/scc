import { COMMON_ACTION } from "../actions/constants/ActionType";

const initialState = {
  isLoading: false,
};

export const sccCommonReducer = (state = initialState, action) => {
    switch (action.type) {
      case COMMON_ACTION.PAGE_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case COMMON_ACTION.PAGE_LOADED:
        return {
          ...state,
          isLoading: false,
        };
      default:
        return state;
    }
}