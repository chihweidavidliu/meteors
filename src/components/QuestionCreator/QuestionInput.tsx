import React, { useState } from "react";
import styled from "styled-components";
import { IQuestion } from "../../types/Question";
import Input from "../Input";
import { useThemeContext } from "../../hooks/useThemeContext";

const QuestionInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr max-content;
  grid-auto-rows: max-content;
  grid-gap: 30px;
  align-items: center;

  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid lightgray;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.01);
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  display: grid;
`;

interface IButtonTheme {
  primaryColour?: string;
  hoverColour?: string;
  fontColour?: string;
}

interface IButtonProps {
  buttonTheme?: IButtonTheme;
}

const Button = styled.button<IButtonProps>`
  font-size: 18px;
  padding: 10px;
  background: ${(props) =>
    props?.buttonTheme?.primaryColour || props.theme.green};
  color: ${(props) => props?.buttonTheme?.fontColour || `white`};
  border: none;
  border-radius: 4px;
  height: max-content;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover,
  &:focus {
    background: ${(props) => props?.buttonTheme?.hoverColour || `#17750a`};
  }

  &:focus {
    outline: none;
    border: 2px solid
      ${(props) => props?.buttonTheme?.primaryColour || props.theme.green};
  }
`;

interface IQuestionInputProps {
  question: IQuestion;
  handleQuestionUpdate: (updatedQuestion: IQuestion) => void;
  handleQuestionDelete: (questionId: string) => void;
}

const QuestionInput = ({
  question,
  handleQuestionUpdate,
  handleQuestionDelete,
}: IQuestionInputProps) => {
  const themeContext = useThemeContext();
  const { red } = themeContext;

  const [term, setTerm] = useState(question.term);
  const [termError, setTermError] = useState("");
  const [definition, setDefinition] = useState(question.definition);
  const [definitionError, setDefinitionError] = useState("");

  return (
    <QuestionInputWrapper>
      <Label>
        Term
        <Input
          blurOnEnter
          value={term}
          error={termError}
          handleChange={(e) => setTerm(e.target.value)}
          placeholder="E.g. Bonjour"
          handleBlur={() => {
            if (!term) {
              setTermError("Term is required");
            }
            handleQuestionUpdate({ ...question, term, definition });
          }}
        />
      </Label>

      <Label>
        Definition
        <Input
          blurOnEnter
          value={definition}
          placeholder="E.g. Hello"
          error={definitionError}
          handleChange={(e) => setDefinition(e.target.value)}
          handleBlur={() => {
            if (!definition) {
              setDefinitionError("Definition is required");
            }
            handleQuestionUpdate({ ...question, term, definition });
          }}
        />
      </Label>

      <Button
        onClick={() => handleQuestionDelete(question.id)}
        buttonTheme={{
          primaryColour: red,
          hoverColour: "darkred",
        }}
      >
        Delete
      </Button>
    </QuestionInputWrapper>
  );
};

export default QuestionInput;
