import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Nunito', sans-serif;
}
*, *:before, *:after {
  box-sizing: inherit;
}
  body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
    color: white;
  }
`;

const theme = {
  primaryColour: "#00404f",
  green: "#54B948",
  red: "#c13000",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/play">
            <Game />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
