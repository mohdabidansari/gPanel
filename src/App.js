import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "./theme";
import Dashboard from "./Dashboard";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Dashboard />
    </MuiThemeProvider>
  );
}

export default App;
