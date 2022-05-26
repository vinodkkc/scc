import React from "react";
import { btnStyle } from "./css/Style";
import "./css/custom.css";
import * as CONSTANT from "../../../shared/Constants";


export default class StepThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attack: this.props.attack,
    };

    this.connection = this.connection.bind(this);
    this.chkPrerq = this.chkPrerq.bind(this);
    this.getPrerq = this.getPrerq.bind(this);
    this.execute = this.execute.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.attack !== this.props.attack) {
      this.setState({
        attack: nextProps.attack,
      });
    }
  }

  connection(props) {
    alert(props.machinename, props.username);
    fetch("http://localhost:5000/connection", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        username: props.username,
        machinename: props.machinename,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  chkPrerq(props) {
    alert(props.machinename, props.username);
    fetch("http://localhost:5000/check_prerequistes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        atomiccmd: props.username,
        psession: props.machinename,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  getPrerq(props) {
    alert(props.machinename, props.username);
    fetch("http://localhost:5000/getprerequistes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        atomiccmd: props.username,
        psession: props.machinename,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  execute(props) {
    alert(props.machinename, props.username);
    fetch("http://localhost:5000/execute", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        atomiccmd: props.username,
        psession: props.machinename,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        // console.log(err);
      });
  }

  render() {
    return (
      <div>
        <br />
        <div className="row">
          <div className="col">
            <label>
              <strong>{CONSTANT.EMULATION.ATTACK_DETAILS}</strong>
            </label>
          </div>
        </div>
        <div className="row formInput">
          <div className="col">
            <label>
              {CONSTANT.EMULATION.ATTACK_TECHNIQUE}
            </label>
          </div>
          <div className="col">
            <label>
              {this.state.attack}
            </label>
          </div>
        </div>

        <div className="row formInput">
          <div className="col">
            <label>
              {CONSTANT.EMULATION.ATTACK_NAME}
            </label>
          </div>
          <div className="col">
            <label>
              {CONSTANT.EMULATION.CYBER_ATTACK}
            </label>
          </div>
        </div>

        <div className="row formInput">
          <div className="col">
            <label>
              {CONSTANT.EMULATION.AFFECTED_SYSTEM}
            </label>
          </div>
          <div className="col">
            <label>
              {CONSTANT.EMULATION.LINUX}
            </label>
          </div>
        </div>

        <div>
          <button style={btnStyle} onClick={() => this.connection(this.props)}>
            {CONSTANT.EMULATION.CONNECT}
          </button>
          <button style={btnStyle} onClick={() => this.chkPrerq(this.props)}>
            {CONSTANT.EMULATION.CHECK_PREREQUISTES}
          </button>
          <button style={btnStyle} onClick={() => this.getPrerq(this.props)}>
            {CONSTANT.EMULATION.GET_PREREQUISTES}
          </button>
          <button style={btnStyle} onClick={() => this.execute(this.props)}>
            {CONSTANT.EMULATION.ATTACK_EXECUTION}
          </button>
        </div>
      </div>
    );
  }
}
