import React, { useState, createRef, useEffect } from "react";
import styled from "styled-components";
import { GameContext } from "../context/GameContext";
import Meteor from "../components/Meteor";
import { useResizeHandler } from "../hooks/useResizeHandler";
import { useQuestionHandler } from "../hooks/useQuestionHandler";
import { Button } from "../components/Button";
import Cannon from "../components/Cannon";
import { IQuestion } from "../types/Question";
import { calculateCannonRotation } from "../util/calculateCannonRotation";
import { useListContext } from "../context/ListContext";
import { useHistory } from "react-router-dom";
import { StarryBackground } from "../components/Background/StarryBackground";
import Card from "../components/Card";
import { H1 } from "../typography/H1";
import worldImage from "../assets/world.svg";
import { P } from "../typography/P";
import { H2 } from "../typography/H2";
import { createNewList } from "../util/createNewList";

import { useAudioContext, SoundEffect } from "../context/AudioContext";
import Tooltip from "../components/Tooltip";
import Checkbox from "../components/Checkbox";

const Modal = styled(Card)`
  position: absolute;
  width: 500px;
  left: calc(50vw - 250px);
  bottom: calc(50vh - 125px);
  background: whitesmoke;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  justify-content: center;
  text-align: center;
  z-index: 3;

  @media (max-width: 767px) {
    width: 90vw;
    left: calc(50vw - 90vw / 2);
  }
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
  &:focus {
    outline: 1px solid ${(props) => props.theme.primaryColour};
  }

  @media (max-width: 376px) {
    margin-bottom: 20px;
  }
`;

const ScoreWrapper = styled.div`
  z-index: 2;
  font-size: 100px;
  position: fixed;
  right: 50px;
  top: 50px;
  @media (max-width: 767px) {
    position: static;
    font-size: 30px;
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

const OptionsWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  padding: 15px 0px;
`;

const CheckboxWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
  align-items: center;
  @media (max-width: 376px) {
    grid-template-columns: 1fr;
  }
`;

function Game() {
  const listContext = useListContext();
  const initialQuestions = listContext.currentList.questions;
  const { areQuestionsValid } = listContext.validateQuestions();

  const history = useHistory();
  const {
    playAudio,
    isBackgroundMusicDisabled,
    setIsBackgroundMusicDisabled,
  } = useAudioContext();

  const [inputRef] = useState(createRef<HTMLInputElement>());
  const [isStarted, setIsStarted] = useState(false);
  const [areTermsAndDefsSwapped, setAreTermsAndDefsSwapped] = useState(false);
  const [cannonRotation, setCannonRotation] = useState(0);
  const [isCannonFiring, setIsCannonFiring] = useState(false);
  const [laserLength, setLaserLength] = useState(1000);
  const [areResultsVisible, setAreResultsVisible] = useState(false);

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
  const meteorSize = 120;

  useEffect(() => {
    setIsBackgroundMusicDisabled(() => false);
  }, [setIsBackgroundMusicDisabled]);

  // redirect home if there are no valid questions in the list
  useEffect(() => {
    if (
      initialQuestions.length === 0 ||
      !listContext.validateQuestions() ||
      !areQuestionsValid
    ) {
      history.push("/");
    }
  }, [
    areQuestionsValid,
    history,
    initialQuestions.length,
    listContext,
    setIsBackgroundMusicDisabled,
  ]);

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
    playAudio(SoundEffect.LASER);

    const { stats } = answeredQuestion;

    const updatedActiveQuestions = activeQuestions.filter(
      (question) => question.id !== answeredQuestion.id
    );
    setActiveQuestions(updatedActiveQuestions);

    const updatedQuestions = [
      ...questions,
      {
        ...answeredQuestion,
        stats: {
          correctlyAnswered: stats.correctlyAnswered + 1,
          appearances: stats.appearances,
        },
      },
    ];

    setQuestions(updatedQuestions);

    const newScore = score + 1;
    if (newScore % 10 === 0) {
      playAudio(SoundEffect.LEVEL_UP);
    }

    setScore(newScore);
  };

  const destroyMeteor = async (answeredQuestion: IQuestion) => {
    const meteorElement = document.getElementById(
      answeredQuestion.id
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

    setTimeout(() => updateQuestionsAndScores(answeredQuestion), 50);
  };

  const checkAnswer = (inputValue: string) => {
    const answeredQuestion = activeQuestions.find((question) => {
      const rightAnswer = areTermsAndDefsSwapped
        ? question.term
        : question.definition;

      return (
        rightAnswer.toLowerCase().trim() === inputValue.trim().toLowerCase()
      );
    });

    if (answeredQuestion) {
      destroyMeteor(answeredQuestion);
    } else {
      playAudio(SoundEffect.ERROR);
    }

    setInputValue("");
  };

  const getUpdatedListPostGame = () => {
    // update questions counts in saved lists
    const { currentList } = listContext;
    const updatedQuestions = [...activeQuestions, ...questions];
    const updatedList = {
      ...currentList,
      questions: currentList.questions.map((question) => {
        const updated = updatedQuestions.find(
          (updatedQuestion) => updatedQuestion.id === question.id
        );
        return updated ? updated : question;
      }),
    };

    return updatedList;
  };
  const saveResultsToLists = () => {
    const { updateLists, setCurrentList } = listContext;
    const updatedList = getUpdatedListPostGame();
    updateLists(updatedList);
    setCurrentList(updatedList);
    return updatedList;
  };

  const handleStartClick = (isRestart?: boolean) => {
    // save previous results to local storage
    const listWithUpdatedScores = saveResultsToLists();
    // only reset this data when starting new game as we want to preserve results to display to user
    setQuestions(listWithUpdatedScores.questions);
    setActiveQuestions([]);
    setScore(0);
    setAreResultsVisible(false);

    if (isRestart) {
      setAreTermsAndDefsSwapped(false);
      return;
    }
    // start game
    inputRef?.current?.focus();
    setIsStarted(!isStarted);
  };

  const handleHomeClick = () => {
    // save results
    saveResultsToLists();
    // clear current list and redirect home
    listContext.setCurrentList(createNewList());
    history.push("/");
  };

  const endGame = () => {
    playAudio(SoundEffect.EXPLOSION);
    setIsStarted(false);
    setCannonRotation(() => 0);
    setIsCannonFiring(() => false);
    setLaserLength(() => 1000);
    setInputValue("");
    setAreResultsVisible(true);
  };

  return (
    <GameContext.Provider
      value={{
        areTermsAndDefsSwapped,
        isStarted,
        setIsStarted: (isStarted: boolean) => setIsStarted(isStarted),
        endGame,
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
        areResultsVisible,
        setAreResultsVisible: (areVisible: boolean) =>
          setAreResultsVisible(areVisible),
      }}
    >
      {!isStarted && !areResultsVisible && (
        <Modal>
          <TitleWrapper>
            <H1>Defend the Earth!</H1>
            <P>
              Don't let the meteors past the red line - type the corresponding
              definition for each term as they hurtle towards Earth in meteor
              form
            </P>

            <strong>Options</strong>

            <OptionsWrapper>
              <CheckboxWrapper>
                <Checkbox
                  id={"swap-checkbox"}
                  handleChange={() =>
                    setAreTermsAndDefsSwapped(!areTermsAndDefsSwapped)
                  }
                  isChecked={areTermsAndDefsSwapped}
                  label="Swap terms and definitions"
                />
                <Tooltip>
                  Check this if you want to practise remembering terms from
                  their given definition
                </Tooltip>
              </CheckboxWrapper>

              <Checkbox
                id={"music-checkbox"}
                handleChange={() =>
                  setIsBackgroundMusicDisabled(!isBackgroundMusicDisabled)
                }
                isChecked={isBackgroundMusicDisabled}
                label="Disable background music"
              />
            </OptionsWrapper>
          </TitleWrapper>

          <Button onClick={() => handleStartClick()}>
            {isStarted ? "End" : "Start"}
          </Button>
        </Modal>
      )}

      {areResultsVisible && (
        <Modal>
          <H1>Your Score</H1>
          <H2>{score}</H2>

          <Button onClick={() => handleStartClick(true)}>Restart</Button>
          <Button onClick={handleHomeClick}>Home</Button>
        </Modal>
      )}

      <StarryBackground noPadding>
        <PlayArea screenHeight={screenHeight} screenWidth={screenWidth}>
          {isStarted &&
            activeQuestions.map((question) => (
              <Meteor key={question.id} question={question} />
            ))}
          <Cannon>
            <World src={worldImage} />
          </Cannon>
        </PlayArea>
        <ScoreWrapper>{score}</ScoreWrapper>
        <StyledInput
          ref={inputRef}
          placeholder="Type answers here"
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
