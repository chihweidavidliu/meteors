import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IQuestion } from "../../types/Question";
import shortid from "shortid";
import QuestionInput from "./QuestionInput";
import { Button } from "../Button";
import { useQuestionContext } from "../../context/QuestionContext";
import Input from "../Input";
import { Label } from "../Label";

const QuestionCreatorWrapper = styled.div``;

const ListNameWrapper = styled.div`
  padding: 20px 0px;
`;

const InnerWrapper = styled.div`
  display: grid;
  grid-gap: 15px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
`;

const createBlankQuestion = () => ({
  id: shortid.generate(),
  term: "",
  definition: "",
  stats: { appearances: 0, correctlyAnswered: 0 },
});

const QuestionCreator = () => {
  const {
    questions,
    setQuestions,
    setListName,
    listName,
  } = useQuestionContext();

  const [listNameValue, setListNameValue] = useState(listName);
  const [listNameError, setListNameError] = useState("");

  useEffect(() => {
    setListNameValue(listName);
  }, [listName]);

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
      <ListNameWrapper>
        <Label>
          List name
          <Input
            placeholder="E.g. French Greetings"
            blurOnEnter
            handleChange={(e) => setListNameValue(e.target.value)}
            value={listNameValue}
            handleBlur={() => {
              if (!listNameValue) {
                return setListNameError("List name is required");
              }
              setListNameError("");
              setListName(listNameValue);
            }}
            error={listNameError}
          />
        </Label>
      </ListNameWrapper>

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
