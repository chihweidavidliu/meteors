import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import { ListProvider } from "./context/ListContext";
import NotFound from "./pages/NotFound";
import { AudioProvider } from "./context/AudioContext";

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
  primaryDark: "#2e3d49",
  blue: "#00404f",
  darkBlue: "#2e3d49",
  green: "#54B948",
  darkGreen: "#17750a",
  red: "#c13000",
  darkRed: "darkred",
  yellow: "#ffd800",
  darkYellow: "#d8bd20",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AudioProvider>
        <ListProvider>
          <Router>
            <GlobalStyle />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/play">
                <Game />
              </Route>
              <Route component={NotFound} />
            </Switch>
          </Router>
        </ListProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
