import React, { useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import { createBlankQuestion } from "./util/createBlankQuestion";
import { QuestionContext } from "./context/QuestionContext";
import NotFound from "./pages/NotFound";

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
  const [listName, setListName] = useState("");
  const [questions, setQuestions] = useState([
    createBlankQuestion(),
    createBlankQuestion(),
    createBlankQuestion(),
  ]);

  const validateQuestions = () => {
    let isValid = true;

    questions.forEach((question) => {
      if (!question.definition || !question.term) {
        isValid = false;
      }
    });

    return isValid;
  };

  return (
    <ThemeProvider theme={theme}>
      <QuestionContext.Provider
        value={{
          questions,
          setQuestions,
          validateQuestions,
          listName,
          setListName,
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
            <Route component={NotFound} />
          </Switch>
        </Router>
      </QuestionContext.Provider>
    </ThemeProvider>
  );
}

export default App;
