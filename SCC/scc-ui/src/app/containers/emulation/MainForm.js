import React from "react";
import MultiStep from "react-multistep";
import "./css/custom.css";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { setAttack } from "../../actions/emulation/EmulationAction";
import store from "../../store/Store";
import { nextBtnStyle, prevBtnStyle } from "./css/Style";
import * as CONSTANT from "../../../shared/Constants";

const steps = [
  { name: CONSTANT.EMULATION.STEP_ONE, component: <StepOne /> },
  { name: CONSTANT.EMULATION.STEP_TWO, component: <StepTwo /> },
  { name: CONSTANT.EMULATION.STEP_THREE, component: <StepThree /> },
  { name: CONSTANT.EMULATION.STEP_FOUR, component: <StepFour /> },
];

export default class AttackEmulation extends React.Component {
  constructor(props) {
    super(props);

    // Set the initial input values
    this.state = {
      currentStep: 1,
      attack: "Atomic Red",
      username: "",
      technique: "",
      machinename: "",
    };

    // Bind the submission to handleChange()
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    steps[0].component = <StepOne handleChange={this.handleChange} />;
    steps[1].component = <StepTwo handleChange={this.handleChange} />;
    steps[2].component = <StepThree handleChange={this.handleChange} />;
    steps[3].component = (
      <StepFour handleChange={this.handleChange} showNavigation={false} />
    );
  }

  componentDidUpdate() {
    steps[0].component = <StepOne handleChange={this.handleChange} />;
    steps[1].component = <StepTwo handleChange={this.handleChange} />;
    steps[2].component = (
      <StepThree
        handleChange={this.handleChange}
        username={this.state.username}
        machinename={this.state.machinename}
        attack={this.state.attack}
        technique={this.state.technique}
        ref={(ref) => (this.child = ref)}
        setState={(state) => this.setState(state)}
      />
    );
    steps[3].component = (
      <StepFour showNavigation={false} handleChange={this.handleChange} />
    );
  }

  // Use the submitted data to set the state
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      technique: value,
    });

    store.dispatch(setAttack(this.state.machinename));
  }

  render() {
    return (
      <div className="frameStyle">
        <MultiStep
          steps={steps}
          prevStyle={prevBtnStyle}
          nextStyle={nextBtnStyle}
          showNavigation={false}
        />
      </div>
    );
  }
}
