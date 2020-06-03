import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IQuestion } from "../../types/Question";
import Input from "../Input";
import { Label } from "../Label";
import { Button } from "../Button";
import { Colour } from "../../types/Colour";

const QuestionInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr max-content;
  grid-auto-rows: max-content;
  grid-gap: 15px;
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
  const [term, setTerm] = useState(question.term);
  const [termError, setTermError] = useState("");
  const [definition, setDefinition] = useState(question.definition);
  const [definitionError, setDefinitionError] = useState("");

  useEffect(() => {
    if (definition) {
      setDefinitionError(() => "");
    }
  }, [definition]);

  useEffect(() => {
    if (term) {
      setTermError(() => "");
    }
  }, [term]);

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
        colour={Colour.RED}
        onClick={() => handleQuestionDelete(question.id)}
      >
        Delete
      </Button>
    </QuestionInputWrapper>
  );
};

export default QuestionInput;
