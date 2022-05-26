import React from "react";
import "./css/custom.css";
import * as CONSTANT from "../../../shared/Constants";

export default class StepOne extends React.Component {

  constructor() {
    super();
    this.state = {
      items: ["T1037.001", "T1070.001"],
      attack: "atomicred",
      data: {},
    };
  }

  componentDidMount() {

    fetch("http://localhost:5000/connection", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        userName: "username",
        machineName: "window",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
      });
  }

  render() {
    return (
      <div>
        <br />
        <div className="row formInput">
          <div className="col">
            <label>
              {CONSTANT.EMULATION.ATTACK_NAME}
            </label>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Attack Name"
              onChange={this.props.handleChange}
              name="username"
            />
          </div>
        </div>

        <div className="row formInput">
          <div className="col">
            <label>
              {CONSTANT.EMULATION.SELECT_TECHNIQUE}
            </label>
          </div>
          <div className="col">
            <select
              className="form-control form-select"
              name="technique"
              id="techId"
              onChange={this.props.handleChange}
            >
              <option>{this.state.items[0]}</option>
              <option>{this.state.items[1]}</option>
            </select>
          </div>
        </div>

        <div className="row formInput">
          <div className="col">
            <label>
              {CONSTANT.EMULATION.ATTACK_TYPE}
            </label>
          </div>
          <div className="col">
            <select
              className="form-control form-select"
              name="attack"
              id="attack"
              value="atomicred"
              disabled
            >
              <option value="atomicred" selected>
                {CONSTANT.EMULATION.ATOMIC_RED}
              </option>
              <option value="manual">
                {CONSTANT.EMULATION.MANUAL_ATTACK}
              </option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
