import React, { useState, createRef } from "react";
import shortid from "shortid";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { GameContext } from "./context/GameContext";
import Meteor from "./components/Meteor";

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
};

const AppWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 20px;
  background: ${(props) => props.theme.primaryColour};
  justify-items: center;
  padding: 40px;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const H1 = styled.h1`
  margin: 0;
  font-size: 36px;
`;

const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: max-content max-content;
  grid-gap: 30px;
  align-items: center;
`;

const PlayArea = styled.div<{ screenWidth: number; screenHeight: number }>`
  position: relative;
  width: ${(props) => `${props.screenWidth}px`};
  height: ${(props) => `${props.screenHeight}px`};
  background-color: white;
  overflow: hidden;
  border-radius: 4px;
`;

const StyledInput = styled.input`
  color: ${(props) => props.theme.primaryColour};
  font-size: 18px;
  padding: 10px;
  width: 300px;
`;

function App() {
  const [inputRef] = useState(createRef<HTMLInputElement>());
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState([
    { id: shortid.generate(), question: "man", answers: ["homme"] },
  ]);
  const [inputValue, setInputValue] = useState("");
  const screenWidth = 900;
  const screenHeight = 600;

  const checkAnswer = (inputValue: string) => {
    const answeredQuestion = questions.find((question) =>
      question.answers.includes(inputValue.trim())
    );

    if (answeredQuestion) {
      const updatedQuestions = questions.filter(
        (question) => question.id !== answeredQuestion.id
      );

      setQuestions(updatedQuestions);
    }

    setInputValue("");
    inputRef?.current?.focus();
  };

  return (
    <GameContext.Provider
      value={{
        isStarted,
        setIsStarted: (isStarted: boolean) => setIsStarted(isStarted),
        screenHeight,
        screenWidth,
        inputValue,
        setInputValue,
        questions,
      }}
    >
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <GlobalStyle />
          <TitleWrapper>
            <H1>Meteors</H1>
          </TitleWrapper>
          <OptionsWrapper>
            <button onClick={() => setIsStarted(!isStarted)}>
              {isStarted ? "End" : "Start"}
            </button>
          </OptionsWrapper>
          <PlayArea screenHeight={screenHeight} screenWidth={screenWidth}>
            {questions.map((question) => (
              <Meteor key={question.id} question={question} />
            ))}
          </PlayArea>
          <StyledInput
            ref={inputRef}
            placeholder="Type translations here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => checkAnswer(inputValue)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                inputRef?.current?.blur();
              }
            }}
          />
        </AppWrapper>
      </ThemeProvider>
    </GameContext.Provider>
  );
}

export default App;
