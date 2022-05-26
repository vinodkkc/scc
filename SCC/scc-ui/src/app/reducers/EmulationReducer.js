import * as type from "../actions/constants/ActionType";

const initialState = {
  currentStep: 1, // Default is Step 1
  attack: "Atomic Red",
  username: "",
  technique: "",
  machinename: "",
};

export const updateAction = (state = initialState, action) => {
  switch (action.type) {
    case type.UPDATE_ATTACK:
      state = { ...state, attack: action.attack };
      return state;

    default:
      return state;
  }
};
