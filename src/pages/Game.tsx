import React, { useState, createRef, useEffect } from "react";
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
import { useQuestionContext } from "../context/QuestionContext";
import { useHistory } from "react-router-dom";
import { StarryBackground } from "../components/Background/StarryBackground";
import Card from "../components/Card";
import { H1 } from "../typography/H1";
import worldImage from "../assets/world.svg";
import { P } from "../typography/P";
const levelUpSound = require("../assets/levelUp.mp3");
const laserSound = require("../assets/laser.mp3");
const errorSound = require("../assets/error.mp3");

const Instructions = styled(Card)`
  position: fixed;
  width: 300px;
  left: calc(50vw - 150px);
  bottom: calc(50vh - 125px);
  background: whitesmoke;
  display: grid;
  grid-gap: 30px;
  grid-template-rows: max-content 1fr;
  justify-content: center;
  z-index: 3;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const PlayArea = styled.div<{ screenWidth: number; screenHeight: number }>`
  position: relative;
  width: 100%;
  max-width: ${(props) => `${props.screenWidth}px`};
  height: ${(props) => `${props.screenHeight}px`};
  border-radius: 4px;
  border-bottom: 3px solid ${(props) => props.theme.red};
`;

const StyledInput = styled.input`
  color: ${(props) => props.theme.primaryColour};
  font-size: 18px;
  padding: 10px;
  width: 300px;
  z-index: 2;
  margin-top: 40px;
  &:focus {
    outline: 1px solid ${(props) => props.theme.primaryColour};
  }
`;

const World = styled.img`
  position: absolute;
  z-index: 0;
  width: 70vw;
  top: 100px;
  left: -35vw;

  @media (max-width: 767px) {
    width: 100vw;
    left: -50vw;
  }
`;

function Game() {
  const questionContext = useQuestionContext();
  const initialQuestions = questionContext.questions;
  const history = useHistory();

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

  const { screenWidth, screenHeight } = useResizeHandler();
  const meteorSize = 100;

  useEffect(() => {
    if (initialQuestions.length === 0 || !questionContext.validateQuestions()) {
      history.push("/");
    }
  }, [history, initialQuestions.length, questionContext]);

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
      {!isStarted && (
        <Instructions>
          <TitleWrapper>
            <H1>Defend the Earth!</H1>
            <P>Don't let the meteors past the red line</P>
          </TitleWrapper>

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
        </Instructions>
      )}

      <StarryBackground noPadding>
        <audio src={levelUpSound} ref={levelUpAudioRef}></audio>
        <audio src={laserSound} ref={laserAudioRef}></audio>
        <audio src={errorSound} ref={errorAudioRef}></audio>

        <PlayArea screenHeight={screenHeight} screenWidth={screenWidth}>
          {isStarted &&
            activeQuestions.map((question) => (
              <Meteor key={question.id} question={question} />
            ))}
          <Cannon>
            <World src={worldImage} />
          </Cannon>
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
      </StarryBackground>
    </GameContext.Provider>
  );
}

export default Game;
