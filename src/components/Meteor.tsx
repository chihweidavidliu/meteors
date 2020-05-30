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
  } = useGameContext();
  const [position, setPosition] = useState<IPosition>({
    positionX: getRandomInt(screenWidth - meteorSize),
    positionY: screenHeight,
  });

  useEffect(() => {
    let shouldGameEnd = false;
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
    }, getRandomInt(20, 10));

    return () => clearInterval(interval);
  }, [setIsStarted]);

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
