import React from "react";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";
import { IQuestion } from "../types/Question";
import { IPosition } from "../types/Position";

interface IMeteorWrapperProps {
  screenWidth: number;
  left?: number;
  bottom?: number;
}

const MeteorWrapper = styled.div.attrs<IMeteorWrapperProps>((props) => ({
  style: {
    left: `${props.left}px` || "0px",
    bottom: `${props.bottom}px` || "0px",
  },
}))<IMeteorWrapperProps>`
  position: absolute;
  width: ${(props) => `${props.screenWidth / 10}px`};
  height: ${(props) => `${props.screenWidth / 10}px`};
  border-radius: 50%;
  background: grey;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface IMeteorProps {
  question: IQuestion;
  position: IPosition;
}

const Meteor = ({ question, position }: IMeteorProps) => {
  const { screenWidth } = useGameContext();
  const { positionX, positionY } = position;

  return (
    <MeteorWrapper
      screenWidth={screenWidth}
      left={positionX}
      bottom={positionY}
    >
      {question.question}
    </MeteorWrapper>
  );
};

export default Meteor;
