import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4285f4",
    },
    secondary: {
      main: "#34a853",
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 700,
  },
  overrides: {
    MuiPaper: {
      elevation4: {
        boxShadow: "0px 1px rgba(0,0,0,.12)",
      },
      elevation1: {
        boxShadow: "0px 1px rgba(0,0,0,.12)",
        // border: "1px solid rgba(0,0,0,.12)",
      },
    },
    // MuiListItem: {
    //   root: {
    //     // backgroundColor: "#e8f0fe",
    //     // color: "#1967d2",
    //   },
    //   selected: {
    //     // backgroundColor: "#e8f0fe",
    //     // color: "#1967d2",
    //     color: "red",
    //     border: "2px solid red",
    //   },
    // },
  },
});

export default theme;
