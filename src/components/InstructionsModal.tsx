import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Button } from "./Button";
import Tooltip from "./Tooltip";
import Checkbox from "./Checkbox";
import { useGameContext } from "../context/GameContext";
import { H1 } from "../typography/H1";
import { P } from "../typography/P";
import { useAudioContext } from "../context/AudioContext";
import { ModalWrapper } from "./ModalWrapper";

const TitleWrapper = styled.div`
  text-align: center;
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

interface IInstructionsModalProps {
  handleStartClick: () => void;
}

const InstructionsModal = ({ handleStartClick }: IInstructionsModalProps) => {
  const {
    setAreTermsAndDefsSwapped,
    areTermsAndDefsSwapped,
    isStarted,
  } = useGameContext();

  const {
    setIsBackgroundMusicDisabled,
    isBackgroundMusicDisabled,
  } = useAudioContext();

  return ReactDOM.createPortal(
    <ModalWrapper>
      <TitleWrapper>
        <H1>Defend the Earth!</H1>
        <P>
          Don't let the meteors past the red line - type the corresponding
          definition for each term as they hurtle towards Earth in meteor form
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
              Check this if you want to practise remembering terms from their
              given definition
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
    </ModalWrapper>,
    document.body
  );
};

export default InstructionsModal;
