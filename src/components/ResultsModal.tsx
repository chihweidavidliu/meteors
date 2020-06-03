import React from "react";
import ReactDOM from "react-dom";
import { ModalWrapper } from "./ModalWrapper";
import { H1 } from "../typography/H1";
import { Button } from "./Button";
import { useGameContext } from "../context/GameContext";
import { H2 } from "../typography/H2";

interface IResultsModalProps {
  handleStartClick: (isRestart?: boolean) => void;
  handleHomeClick: () => void;
}

const ResultsModal = ({
  handleStartClick,
  handleHomeClick,
}: IResultsModalProps) => {
  const { score } = useGameContext();
  return ReactDOM.createPortal(
    <ModalWrapper>
      <H1>Your Score</H1>
      <H2>{score}</H2>

      <Button onClick={() => handleStartClick(true)}>Restart</Button>
      <Button onClick={handleHomeClick}>Home</Button>
    </ModalWrapper>,
    document.body
  );
};

export default ResultsModal;
