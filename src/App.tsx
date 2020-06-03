import React, { useState, useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./pages/Game";
import Home from "./pages/Home";
import { ListContext } from "./context/ListContext";
import NotFound from "./pages/NotFound";
import { IList } from "./types/List";
import { getSavedLists } from "./util/getSavedLists";
import { createNewList } from "./util/createNewList";

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
  const [currentList, setCurrentList] = useState<IList>(createNewList());

  useEffect(() => {
    const savedLists = getSavedLists();
    setSavedLists(() => savedLists);
  }, []);

  const validateQuestions = () => {
    let areQuestionsValid = true;
    let hasSomeEntries = false;

    currentList.questions.forEach((question) => {
      if (!question.definition || !question.term) {
        areQuestionsValid = false;
      }
      if (question.definition || question.term) {
        hasSomeEntries = true;
      }
    });

    return { areQuestionsValid, hasSomeEntries };
  };

  return (
    <ThemeProvider theme={theme}>
      <ListContext.Provider
        value={{
          currentList,
          setCurrentList: (list: IList) => setCurrentList(list),
          validateQuestions,
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
      </ListContext.Provider>
    </ThemeProvider>
  );
}

export default App;
