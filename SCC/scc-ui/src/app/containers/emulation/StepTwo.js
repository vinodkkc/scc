import React from "react";
import "./css/custom.css";
import * as CONSTANT from "../../../shared/Constants";


export default class StepOne extends React.Component {  
  render() {
    return (
      <div>
        <br />

        <div className="row formInput">
          <div className="col">
            <label>
              {CONSTANT.EMULATION.MACHINE_INFORMATION}
            </label>
          </div>
          <div className="col">
            <select
              className="form-control form-select"
              name="cars"
              id="cars"
            >
              <option>{CONSTANT.EMULATION.WINDOW}</option>
              <option>{CONSTANT.EMULATION.LINUX}</option>
              <option>{CONSTANT.EMULATION.CLOUD}</option>
              <option>{CONSTANT.EMULATION.DOCKER}</option>
              <option>{CONSTANT.EMULATION.LOCALHOST}</option>
            </select>
          </div>
        </div>

        <div className="row formInput">
          <div className="col">
            <label>
              {CONSTANT.EMULATION.MACHINE_USERNAME}
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
              {CONSTANT.EMULATION.MACHINE_NAME}
            </label>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Machine Name"
              aria-describedby="sizing-addon2"
              name="machinename"
              onChange={this.props.handleChange}
            />
          </div>
        </div>

        <div className="row formInput">
          <div className="col">
            <label>
              {CONSTANT.EMULATION.MACHINE_DESCRIPTION}
            </label>
          </div>
          <div className="col">
            <textarea
              type="text"
              className="form-control"
              placeholder="Target Machine Description"
              aria-describedby="sizing-addon2"
            />
          </div>
        </div>
      </div>
    );
  }
}
