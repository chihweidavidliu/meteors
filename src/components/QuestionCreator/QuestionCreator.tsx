import React from "react";
import styled from "styled-components";
import { IQuestion } from "../../types/Question";
import shortid from "shortid";
import QuestionInput from "./QuestionInput";
import { Button } from "../Button";
import { useQuestionContext } from "../../context/QuestionContext";

const QuestionCreatorWrapper = styled.div``;

const InnerWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
  padding: 20px 0px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const createBlankQuestion = () => ({
  id: shortid.generate(),
  term: "",
  definition: "",
  stats: { appearances: 0, correctlyAnswered: 0 },
});

const QuestionCreator = () => {
  const { questions, setQuestions } = useQuestionContext();

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

  const addQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, createBlankQuestion()]);
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== questionId)
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
            handleQuestionDelete={deleteQuestion}
          />
        ))}
      </InnerWrapper>

      <ButtonWrapper>
        <Button onClick={addQuestion}>Add Term</Button>
      </ButtonWrapper>
    </QuestionCreatorWrapper>
  );
};

export default QuestionCreator;
