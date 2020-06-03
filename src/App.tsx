import React, { useState, useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import { createBlankQuestion } from "./util/createBlankQuestion";
import { QuestionContext } from "./context/QuestionContext";
import NotFound from "./pages/NotFound";
import { IList } from "./types/List";
import { getSavedLists } from "./util/getSavedLists";

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
  const [savedLists, setSavedLists] = useState<IList[]>([]);
  const [listName, setListName] = useState("");
  const [questions, setQuestions] = useState([createBlankQuestion()]);

  useEffect(() => {
    const savedLists = getSavedLists();
    setSavedLists(() => savedLists);
  }, []);

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
          savedLists,
          setSavedLists: (lists: IList[]) => setSavedLists(lists),
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
