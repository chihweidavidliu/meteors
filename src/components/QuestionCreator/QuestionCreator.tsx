import React, { useState, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { IQuestion } from "../../types/Question";
import shortid from "shortid";
import Input from "../Input";

const QuestionCreatorWrapper = styled.div``;

const InnerWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  padding: 20px 0px;
`;

const QuestionInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr max-content;
  grid-gap: 30px;
  align-items: flex-end;
`;

const Label = styled.label`
  display: grid;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
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
}

const QuestionInput = ({ question }: IQuestionInputProps) => {
  const themeContext = useContext(ThemeContext);
  const { red } = themeContext;

  const [term, setTerm] = useState(question.term);
  const [definition, setDefinition] = useState(question.definition);

  return (
    <QuestionInputWrapper>
      <Label>
        Term
        <Input
          blurOnEnter
          value={term}
          handleChange={(e) => setTerm(e.target.value)}
        />
      </Label>

      <Label>
        Definition
        <Input
          blurOnEnter
          value={definition}
          handleChange={(e) => setDefinition(e.target.value)}
        />
      </Label>

      <Button
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

const QuestionCreator = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([
    {
      id: shortid.generate(),
      term: "",
      definition: "",
      stats: { appearances: 0, correctlyAnswered: 0 },
    },
    {
      id: shortid.generate(),
      term: "",
      definition: "",
      stats: { appearances: 0, correctlyAnswered: 0 },
    },
    {
      id: shortid.generate(),
      term: "",
      definition: "",
      stats: { appearances: 0, correctlyAnswered: 0 },
    },
  ]);

  const handleQuestionUpdate = (updatedQuestion: IQuestion) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === updatedQuestion.id) {
          return updatedQuestion;
        }
        return question;
      })
    );
  };

  return (
    <QuestionCreatorWrapper>
      <InnerWrapper>
        {questions.map((question) => (
          <QuestionInput
            key={question.id}
            question={question}
            handleQuestionUpdate={handleQuestionUpdate}
          />
        ))}
      </InnerWrapper>

      <ButtonWrapper>
        <Button>Add Term</Button>
      </ButtonWrapper>
    </QuestionCreatorWrapper>
  );
};

export default QuestionCreator;
