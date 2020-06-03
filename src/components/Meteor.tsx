import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";
import { IQuestion } from "../types/Question";
import { IPosition } from "../types/Position";
import { getRandomInt } from "../util/getRandomInt";
const asteroidImage = require("../assets/asteroid.png");

interface IMeteorWrapperProps {
  meteorSize: number;
  left?: number;
  bottom?: number;
}

const MeteorWrapper = styled.div.attrs<IMeteorWrapperProps>((props) => ({
  style: {
    left: `${props.left}px`,
    bottom: `${props.bottom}px`,
  },
}))<IMeteorWrapperProps>`
  position: absolute;
  width: ${(props) => `${props.meteorSize}px`};
  height: ${(props) => `${props.meteorSize}px`};
  border-radius: 50%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ImageProps {
  rotation: number;
}
const StyledImage = styled.img.attrs<ImageProps>((props) => ({
  style: {
    transform: `rotate(${props.rotation}deg)`,
  },
}))<ImageProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  transition: transform 0.2s;
`;

const Question = styled.div`
  z-index: 4;
`;

export interface IMeteorProps {
  question: IQuestion;
}

const Meteor = ({ question }: IMeteorProps) => {
  const {
    meteorSize,
    screenWidth,
    screenHeight,
    setIsStarted,
    score,
    setAreResultsVisible,
  } = useGameContext();

  const [position, setPosition] = useState<IPosition>({
    positionX: getRandomInt(screenWidth - meteorSize),
    positionY: screenHeight,
  });

  const [rotation, setRotation] = useState(getRandomInt(360));

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let shouldGameEnd = false;

    const calculateInterval = () => {
      if (score < 10) {
        return getRandomInt(30, 20);
      }

      if (score < 20) {
        return getRandomInt(20, 15);
      }

      if (score < 30) {
        return getRandomInt(15, 10);
      }

      if (score < 40) {
        return getRandomInt(10, 5);
      }

      return 5;
    };

    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        const newPositionY = prevPosition.positionY - 1;

        if (newPositionY <= 0) {
          shouldGameEnd = true;
        }
        return { ...prevPosition, positionY: newPositionY };
      });

      if (shouldGameEnd) {
        setIsStarted(false);
        setAreResultsVisible(true);
      }
    }, calculateInterval());

    return () => clearInterval(interval);
  }, [score, setAreResultsVisible, setIsStarted]);

  return (
    <MeteorWrapper
      id={question.id}
      data-position-x={position.positionX}
      data-position-y={position.positionY}
      meteorSize={meteorSize}
      left={position.positionX}
      bottom={position.positionY}
    >
      <StyledImage
        src={asteroidImage}
        alt="asteroid"
        width={meteorSize}
        rotation={rotation}
      />
      <Question>{question.term}</Question>
    </MeteorWrapper>
  );
};

export default Meteor;
