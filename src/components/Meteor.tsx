import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";
import { IQuestion } from "../types/Question";
import { IPosition } from "../types/Position";
import { getRandomInt } from "../util/getRandomInt";

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
  background: grey;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
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
  } = useGameContext();
  const [position, setPosition] = useState<IPosition>({
    positionX: getRandomInt(screenWidth - meteorSize),
    positionY: screenHeight,
  });

  useEffect(() => {
    let shouldGameEnd = false;

    const calculateInterval = () => {
      if (score < 10) {
        return getRandomInt(20, 10);
      }

      if (score < 20) {
        return getRandomInt(15, 8);
      }

      if (score < 30) {
        return getRandomInt(10, 5);
      }

      if (score < 40) {
        return getRandomInt(7, 5);
      }

      return getRandomInt(20, 10);
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
      }
    }, calculateInterval());

    return () => clearInterval(interval);
  }, [score, setIsStarted]);

  return (
    <MeteorWrapper
      meteorSize={meteorSize}
      left={position.positionX}
      bottom={position.positionY}
    >
      {question.question}
    </MeteorWrapper>
  );
};

export default Meteor;
