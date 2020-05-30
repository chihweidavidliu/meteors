import React from "react";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";
import { IQuestion } from "../types/Question";

interface IMeteorWrapperProps {
  screenWidth: number;
}

const MeteorWrapper = styled.div<IMeteorWrapperProps>`
  position: absolute;
  top: 10px;
  left: 10px;
  width: ${(props) => `${props.screenWidth / 10}px`};
  height: ${(props) => `${props.screenWidth / 10}px`};
  border-radius: 50%;
  background: grey;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IMeteorProps {
  question: IQuestion;
}

const Meteor = ({ question }: IMeteorProps) => {
  const { screenWidth } = useGameContext();

  return (
    <MeteorWrapper screenWidth={screenWidth}>{question.question}</MeteorWrapper>
  );
};

export default Meteor;
