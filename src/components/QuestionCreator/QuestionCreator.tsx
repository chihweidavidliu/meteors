import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IQuestion } from "../../types/Question";
import shortid from "shortid";
import QuestionInput from "./QuestionInput";
import { Button } from "../Button";
import { useQuestionContext } from "../../context/QuestionContext";
import Input from "../Input";
import { Label } from "../Label";
import { getSavedLists } from "../../util/getSavedLists";
import { useHistory } from "react-router-dom";
import { updateSavedLists } from "../../util/updateSavedLists";
import { IList } from "../../types/List";

const QuestionCreatorWrapper = styled.div``;

const ToolbarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 200px));
  grid-gap: 15px;
`;

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

const StartButton = styled(Button)`
  animation: emphasize 0.8s;
  @keyframes emphasize {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
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
    validateQuestions,
  } = useQuestionContext();

  const history = useHistory();
  const [listNameValue, setListNameValue] = useState(listName);
  const [listNameError, setListNameError] = useState("");

  const areQuestionsValid = validateQuestions();

  const handleStartClick = () => {
    const existingLists = getSavedLists();

    const hasListPreviouslyBeenSaved = existingLists.find(
      (list) => list.name === listName
    );

    const updatedLists: IList[] = hasListPreviouslyBeenSaved
      ? existingLists.map((savedList) => {
          if (savedList.name === listName) {
            return { ...savedList, questions };
          }
          return savedList;
        })
      : [
          ...existingLists,
          { id: shortid.generate(), name: listName, questions },
        ];
    updateSavedLists(updatedLists);
    history.push("/play");
  };

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
    setQuestions((prevQuestions) => {
      if (prevQuestions.length === 1) {
        return [createBlankQuestion()];
      }

      return prevQuestions.filter((question) => question.id !== questionId);
    });
  };

  return (
    <QuestionCreatorWrapper>
      <ToolbarWrapper>
        <Button
          isDeleteButton
          onClick={() => {
            setListName("");
            setQuestions([
              createBlankQuestion(),
              createBlankQuestion(),
              createBlankQuestion(),
            ]);
          }}
        >
          Reset
        </Button>
        {areQuestionsValid && listName && (
          <StartButton type="button" onClick={handleStartClick}>
            Start Learning!
          </StartButton>
        )}
      </ToolbarWrapper>
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
