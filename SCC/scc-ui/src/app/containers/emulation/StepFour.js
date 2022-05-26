import React from "react";
import * as CONSTANT from "../../../shared/Constants";
import "./css/custom.css";

export default function StepFour() {
  return (
    <div>
      <br />
      <div className="row">
        <div className="col">
          <label
            for="technique"
          >
            { CONSTANT.EMULATION.ATTACK_ACCEPT_MESSAGE }
          </label>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <input
            className="form-check-input"
            type="checkbox"
            id="autoSizingCheck"
          />
          <label
            for="technique"
          >
            { CONSTANT.EMULATION.ACCEPT }
          </label>
        </div>
      </div>
      <div className="col formInput">
        <button type="submit" className="btn btn-primary">
          { CONSTANT.EMULATION.SUBMIT }
        </button>
      </div>
      <br />
      <br />
    </div>
  );
}
