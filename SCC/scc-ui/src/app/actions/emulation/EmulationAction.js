import * as action from "../constants/ActionType";

export const setAttack = (attackName = "default attack") => {
  return {
    type: action.UPDATE_ATTACK,
    attack: attackName,
  };
};

export const setTechnique = () => {
  return {
    type: action.UPDATE_TECHNIQUE,
  };
};

export const setMachine = () => {
  return {
    type: action.UPDATE_MACHINE,
  };
};
