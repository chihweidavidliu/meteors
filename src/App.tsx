import React, { useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import { createBlankQuestion } from "./util/createBlankQuestion";
import { QuestionContext } from "./context/QuestionContext";
import { IQuestion } from "./types/Question";

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
  const [questions, setQuestions] = useState([
    createBlankQuestion(),
    createBlankQuestion(),
    createBlankQuestion(),
  ]);

  return (
    <ThemeProvider theme={theme}>
      <QuestionContext.Provider
        value={{
          questions,
          setQuestions,
        }}
      >
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
      </QuestionContext.Provider>
    </ThemeProvider>
  );
}

export default App;
