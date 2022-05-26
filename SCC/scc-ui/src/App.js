import { ThemeProvider } from "@material-ui/styles";
import React, { Component } from "react";
import Dashboard from "./app/containers/dashboard/home/HomepageContainer";
import Spinner from "./app/containers/spinner/Spinner";
import "./styles/css/App.css";
import theme from "./styles/Theme";

class App extends Component {
  render() {
    return (
      <div className="app">
        <ThemeProvider theme={theme}>
          <Dashboard />
          <Spinner />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
