import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import "./fonts/Helvetica/Helvetica.ttf";
import bluebackground from "./images/bluebackground.png";
import laptopbackground from "./images/laptop.jpg";

const themeLight = responsiveFontSizes(
  createTheme({
    // spacing: 4,
    typography: {
      fontFamily: ["Helvetica", "Raleway", "Open Sans"].join(","),
      h1: {
        fontSize: "5rem",
        fontFamily: "Helvetica",
      },
      h2: {
        fontSize: "3.5rem",
        fontFamily: "Open Sans",
        fontStyle: "Helvetica",
      },
      h3: {
        fontSize: "2.5rem",
        fontFamily: "Helvetica",
      },
      h4: {
        fontSize: "1.5rem",
        fontFamily: "Helvetica",
        fontWeight: "bold",
      },
      h5: {
        fontSize: "1.25rem",
        fontFamily: "Helvetica",
      },
      h6: {
        fontSize: "1.10rem",
        fontFamily: "Helvetica",
      },
    },
    palette: {
      type: "light",
      background: {
        default: "#009900",
      },
      primary: {
        light: "#007bff",
        main: "#007bff"
      },
      primaryDark: {
        main: "#0d47a1",
      },
      secondary: {
        light: "#FFFFFF",
        main: "#6753c0"
      },
      secondaryDark: {
        main: "#9933CC",
      },
      header: {
        main: "#1d237c",
        mainGradient: "linear-gradient(to right, #6753c0, #0e1967)",
      },
      footer: {
        main: "#1d237c",
        mainGradient: "linear-gradient(to right, #6753c0, #0e1967)",
      },
      text: {
        primary: "#000000", //black
        secondary: "#757575", //grey
      },
      mainContainer: {
        primary: "#eff1f4",
        secondary: "#FFFFFF",
      },
      tiles: {
        main: "#FFFFFF",
        mainGradient: "linear-gradient(to right,#585858, #484848)",
      },
    },
    loginPageBackground: {
      backgroundImage: bluebackground,
      backgroundSize: "cover",
    },
    status: {
      danger: "#CC0000",
      warning: "#FC7B09",
      success: "#09FE00",
      info: "#6B7D6A",
      error: "#D72A2A",
    },
  })
);

const themeDark = responsiveFontSizes(
  createTheme({
    // spacing: 4,
    typography: {
      fontFamily: ["Helvetica", "Raleway", "Open Sans"].join(","),
      h1: {
        fontSize: "5rem",
        fontFamily: "Helvetica",
        color: "#000000",
      },
      h2: {
        fontSize: "3.5rem",
        fontFamily: "Open Sans",
        fontStyle: "Helvetica",
        color: "#ffffff",
      },
      h3: {
        fontSize: "2.5rem",
        fontFamily: "Helvetica",
      },
      h4: {
        fontSize: "1.5rem",
        fontFamily: "Helvetica",
        fontWeight: "bold",
      },
      h5: {
        fontSize: "1.25rem",
        fontFamily: "Helvetica",
      },
      h6: {
        fontSize: "1.10rem",
        fontFamily: "Helvetica",
      },
    },
    palette: {
      type: "dark",
      background: {
        default: "#009900",
      },
      primary: {
        light: "#2B37D4",
        main: "#FFFFFF"
      },
      primaryDark: {
        main: "#0d47a1",
      },
      secondary: {
        light: "#FFFFFF",
        main: "#FFFFFF"
      },
      secondaryDark: {
        main: "#9933CC",
      },
      header: {
        main: "#1d237c",
        mainGradient: "linear-gradient(to right, #787878, #101010)",
      },
      footer: {
        main: "#404040",
        mainGradient: "linear-gradient(to right, #787878, #101010)",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#9e9e9e",
      },
      mainContainer: {
        primary: "#000000", //black
        secondary: "#FFFFFF", //white
      },
      tiles: {
        main: "#383838",
        mainGradient: "linear-gradient(to right,#585858, #484848)",
      },
    },
    loginPageBackground: {
      backgroundImage: laptopbackground,
      backgroundSize: "cover",
    },
    status: {
      danger: "#CC0000",
      warning: "#FC7B09",
      success: "#09FE00",
      info: "#6B7D6A",
      error: "#D72A2A",
    },
  })
);
var theme = themeLight;
export default theme;
