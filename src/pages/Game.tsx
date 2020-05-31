import React, { useState, createRef, useEffect } from "react";
import shortid from "shortid";
import styled from "styled-components";
import { GameContext } from "../context/GameContext";
import Meteor from "../components/Meteor";
import { useResizeHandler } from "../hooks/useResizeHandler";
import { useQuestionHandler } from "../hooks/useQuestionHandler";
import { setAudioVolume } from "../util/setAudioVolume";
import { Button } from "../components/Button";
import Cannon from "../components/Cannon";
import { IQuestion } from "../types/Question";
import { calculateCannonRotation } from "../util/calculateCannonRotation";
const starsImage = require("../assets/stars.png");
const levelUpSound = require("../assets/levelUp.mp3");
const laserSound = require("../assets/laser.mp3");
const errorSound = require("../assets/error.mp3");

const GameWrapper = styled.div`
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

const Stars = styled.div`
  background: black url(${starsImage}) repeat;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  z-index: 0;
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

const StyledInput = styled.input`
  color: ${(props) => props.theme.primaryColour};
  font-size: 18px;
  padding: 10px;
  width: 300px;
`;

function App() {
  const initialQuestions: IQuestion[] = [
    {
      id: shortid.generate(),
      term: "man",
      definition: "homme",

      stats: { correctlyAnswered: 0, appearances: 0 },
    },
    {
      id: shortid.generate(),
      term: "woman",
      definition: "femme",

      stats: { correctlyAnswered: 0, appearances: 0 },
    },
    {
      id: shortid.generate(),
      term: "boy",
      definition: "garçon",

      stats: { correctlyAnswered: 0, appearances: 0 },
    },
    {
      id: shortid.generate(),
      term: "girl",
      definition: "fille",

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
  const [laserLength, setLaserLength] = useState(1000);
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
    } else {
      setCannonRotation(() => 0);
      setIsCannonFiring(() => false);
      setLaserLength(() => 1000);
      setInputValue("");
    }
  }, [inputRef, isStarted]);

  const fireCannon = (angle: number, hypotenuse: number) => {
    setCannonRotation(angle);
    setLaserLength(hypotenuse);
    setIsCannonFiring(true);

    setTimeout(() => {
      setIsCannonFiring(false);
      setLaserLength(1000);
    }, 200);
  };

  const updateQuestionsAndScores = (answeredQuestion: IQuestion) => {
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

  const destroyMeteor = async (answeredQuestion: IQuestion) => {
    const meteorElement = document.querySelector(
      `#${answeredQuestion.term}`
    ) as HTMLElement;

    if (
      !meteorElement ||
      !meteorElement.dataset.positionX ||
      !meteorElement.dataset.positionY
    ) {
      return;
    }

    const { theta, hypotenuse } = calculateCannonRotation(
      meteorElement,
      screenWidth,
      meteorSize
    );

    fireCannon(theta, hypotenuse);

    setTimeout(() => updateQuestionsAndScores(answeredQuestion), 100);
  };

  const checkAnswer = (inputValue: string) => {
    const answeredQuestion = activeQuestions.find(
      (question) =>
        question.definition.toLowerCase().trim() ===
        inputValue.trim().toLowerCase()
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
        laserLength,
      }}
    >
      <GameWrapper>
        <audio src={levelUpSound} ref={levelUpAudioRef}></audio>
        <audio src={laserSound} ref={laserAudioRef}></audio>
        <audio src={errorSound} ref={errorAudioRef}></audio>
        <TitleWrapper>
          <H1>Meteors</H1>
        </TitleWrapper>
        <OptionsWrapper>
          <Button
            onClick={() => {
              // only reset this data when starting new game as we want to preserve results to display to user
              setQuestions(initialQuestions);
              setActiveQuestions([]);
              setScore(0);

              // start game
              setIsStarted(!isStarted);
            }}
          >
            {isStarted ? "End" : "Start"}
          </Button>
        </OptionsWrapper>
        <PlayArea screenHeight={screenHeight} screenWidth={screenWidth}>
          <Stars />
          {isStarted &&
            activeQuestions.map((question) => (
              <Meteor key={question.id} question={question} />
            ))}
          <Cannon />
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
      </GameWrapper>
    </GameContext.Provider>
  );
}

export default App;
