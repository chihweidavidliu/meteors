import React, { useState, createRef, useEffect } from "react";
import shortid from "shortid";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { GameContext } from "./context/GameContext";
import Meteor from "./components/Meteor";
import { useResizeHandler } from "./hooks/useResizeHandler";
import { useQuestionHandler } from "./hooks/useQuestionHandler";
import { setAudioVolume } from "./util/setAudioVolume";
import { Button } from "./components/Button";
import Cannon from "./components/Cannon";
import { IQuestion } from "./types/Question";
import { radiansToDegrees } from "./util/radiansToDegrees";
const levelUpSound = require("./assets/levelUp.mp3");
const laserSound = require("./assets/laser.mp3");
const errorSound = require("./assets/error.mp3");

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
  padding: 40px 0px;
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
  width: 100%;
  max-width: ${(props) => `${props.screenWidth}px`};
  height: ${(props) => `${props.screenHeight}px`};
  background-color: white;
  overflow: hidden;
  border-radius: 4px;
  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  border: 3px solid lightgrey;
`;

const Guide = styled.div<{ left: number; bottom: number }>`
  position: absolute;
  left: ${(props) => `${props.left}px`};
  bottom: ${(props) => `${props.bottom}px`};
  width: 1px;
  height: 1px;
  background: red;
  z-index: 100;
`;

const StyledInput = styled.input`
  color: ${(props) => props.theme.primaryColour};
  font-size: 18px;
  padding: 10px;
  width: 300px;
`;

function App() {
  const initialQuestions = [
    {
      id: shortid.generate(),
      question: "man",
      answers: ["homme"],

      stats: { correctlyAnswered: 0, appearances: 0 },
    },
    {
      id: shortid.generate(),
      question: "woman",
      answers: ["femme"],

      stats: { correctlyAnswered: 0, appearances: 0 },
    },
    {
      id: shortid.generate(),
      question: "boy",
      answers: ["garçon"],

      stats: { correctlyAnswered: 0, appearances: 0 },
    },
    {
      id: shortid.generate(),
      question: "girl",
      answers: ["fille"],

      stats: { correctlyAnswered: 0, appearances: 0 },
    },
  ];

  const [inputRef] = useState(createRef<HTMLInputElement>());
  const [levelUpAudioRef] = useState(createRef<HTMLAudioElement>());
  const [errorAudioRef] = useState(createRef<HTMLAudioElement>());
  const [laserAudioRef] = useState(createRef<HTMLAudioElement>());
  const [isStarted, setIsStarted] = useState(false);
  const [cannonRotation, setCannonRotation] = useState(0);
  const [isCannonFiring, setIsCannonFiring] = useState(false);
  const {
    questions,
    setQuestions,
    activeQuestions,
    setActiveQuestions,
    lastDestroyed,
  } = useQuestionHandler(initialQuestions, isStarted);
  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const { screenWidth } = useResizeHandler();
  const screenHeight = 600;
  const meteorSize = 100;

  useEffect(() => {
    if (isStarted) {
      return inputRef?.current?.focus();
    }
  }, [inputRef, isStarted]);

  const fireCannon = (angle: number) => {
    setIsCannonFiring(true);
    setCannonRotation(angle);
    setIsCannonFiring(false);
  };

  const cannonPosition = { positionY: 50, positionX: screenWidth / 2 };

  const destroyMeteor = (answeredQuestion: IQuestion) => {
    const meteorElement = document.querySelector(
      `#${answeredQuestion.question}`
    ) as HTMLElement;

    if (
      !meteorElement ||
      !meteorElement.dataset.positionX ||
      !meteorElement.dataset.positionY
    ) {
      return;
    }

    // calculate rotation of cannon and fire cannon

    // TODO: fix this
    console.log("cannonPositionX", cannonPosition.positionX);
    const meteorPositionX = parseInt(meteorElement.dataset.positionX);
    const meteorPositionY = parseInt(meteorElement.dataset.positionY);
    console.log("meteorPositionX", meteorPositionX);
    console.log("meteorPositionY", meteorPositionY);

    if (cannonPosition.positionX === meteorPositionX) {
      fireCannon(0);
    } else if (meteorPositionY <= 50) {
      const adjacentLength = 50 - meteorPositionY;
      const oppositeLength = meteorPositionX - cannonPosition.positionX;

      const theta = radiansToDegrees(
        Math.atan(oppositeLength / adjacentLength)
      );

      const sign = Math.sign(oppositeLength);
      const isNegative = sign === -1;
      const result = isNegative ? -180 - theta : 180 - theta;

      fireCannon(result);
    } else {
      const oppositeLength = meteorPositionX - cannonPosition.positionX;

      const adjacentLength = meteorPositionY - 50;
      const theta = radiansToDegrees(
        Math.atan(oppositeLength / adjacentLength)
      );

      fireCannon(theta);
    }

    // wait for laser animation

    setAudioVolume(laserAudioRef, 0.4);
    laserAudioRef?.current?.play();

    const { stats } = answeredQuestion;

    const updatedActiveQuestions = activeQuestions.filter(
      (question) => question.id !== answeredQuestion.id
    );
    setActiveQuestions(updatedActiveQuestions);
    setQuestions([
      ...questions,
      {
        ...answeredQuestion,
        stats: {
          correctlyAnswered: stats.correctlyAnswered++,
          appearances: stats.appearances,
        },
      },
    ]);

    const newScore = score + 1;
    if (newScore % 10 === 0) {
      setAudioVolume(levelUpAudioRef, 0.4);
      levelUpAudioRef?.current?.play();
    }

    setScore(newScore);
  };

  const checkAnswer = (inputValue: string) => {
    const answeredQuestion = activeQuestions.find((question) =>
      question.answers.includes(inputValue.trim())
    );

    if (answeredQuestion) {
      destroyMeteor(answeredQuestion);
    } else {
      setAudioVolume(errorAudioRef, 0.4);
      errorAudioRef?.current?.play();
    }

    setInputValue("");
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
        score,
        meteorSize,
        lastDestroyed,
        cannonRotation,
        setCannonRotation: (rotation: number) => setCannonRotation(rotation),
        destroyMeteor,
        isCannonFiring,
        fireCannon,
      }}
    >
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <GlobalStyle />
          <audio src={levelUpSound} ref={levelUpAudioRef}></audio>
          <audio src={laserSound} ref={laserAudioRef}></audio>
          <audio src={errorSound} ref={errorAudioRef}></audio>
          <TitleWrapper>
            <H1>Meteors</H1>
          </TitleWrapper>
          <OptionsWrapper>
            <Button
              onClick={() => {
                setInputValue("");
                setQuestions(initialQuestions);
                setActiveQuestions([]);
                setScore(0);
                setIsStarted(!isStarted);
              }}
            >
              {isStarted ? "End" : "Start"}
            </Button>
          </OptionsWrapper>
          <PlayArea screenHeight={screenHeight} screenWidth={screenWidth}>
            {isStarted &&
              activeQuestions.map((question) => (
                <Meteor key={question.id} question={question} />
              ))}

            <Cannon />
            <Guide
              left={cannonPosition.positionX}
              bottom={cannonPosition.positionY}
            />
          </PlayArea>

          {score}
          <StyledInput
            ref={inputRef}
            placeholder="Type translations here"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                checkAnswer(inputValue);
              }
            }}
          />
        </AppWrapper>
      </ThemeProvider>
    </GameContext.Provider>
  );
}

export default App;
