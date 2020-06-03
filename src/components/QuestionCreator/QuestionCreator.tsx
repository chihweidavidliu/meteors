import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IQuestion } from "../../types/Question";
import shortid from "shortid";
import QuestionInput from "./QuestionInput";
import { Button } from "../Button";
import { useListContext } from "../../context/ListContext";
import Input from "../Input";
import { Label } from "../Label";
import { getSavedLists } from "../../util/getSavedLists";
import { useHistory } from "react-router-dom";
import { updateSavedLists } from "../../util/updateSavedLists";
import { IList } from "../../types/List";
import { Colour } from "../../types/Colour";
import { createNewList } from "../../util/createNewList";

const QuestionCreatorWrapper = styled.div``;

const ToolbarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-gap: 10px;
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
    validateQuestions,
    setSavedLists,
    currentList,
    setCurrentList,
  } = useListContext();

  const history = useHistory();
  const [listNameValue, setListNameValue] = useState(currentList.name);
  const [listNameError, setListNameError] = useState("");

  const { areQuestionsValid } = validateQuestions();

  const updateLists = () => {
    const existingLists = getSavedLists();

    const hasListPreviouslyBeenSaved = existingLists.find(
      (list) => list.name === currentList.name
    );

    const updatedLists: IList[] = hasListPreviouslyBeenSaved
      ? existingLists.map((savedList) => {
          if (savedList.name === currentList.name) {
            return { ...savedList, questions: currentList.questions };
          }
          return savedList;
        })
      : [
          ...existingLists,
          {
            id: shortid.generate(),
            name: currentList.name,
            questions: currentList.questions,
          },
        ];

    // update in state
    setSavedLists(updatedLists);
    // update in local storage
    updateSavedLists(updatedLists);
  };

  const handleStartClick = () => {
    updateLists();
    history.push("/play");
  };

  useEffect(() => {
    setListNameValue(currentList.name);
  }, [currentList.name]);

  const handleQuestionUpdate = (updatedQuestion: IQuestion) => {
    const updatedQuestions = currentList.questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      }
      return question;
    });

    setCurrentList({ ...currentList, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setCurrentList({
      ...currentList,
      questions: [...currentList.questions, createBlankQuestion()],
    });
  };

  const deleteQuestion = (questionId: string) => {
    const updatedQuestions =
      currentList.questions.length > 1
        ? currentList.questions.filter((question) => question.id !== questionId)
        : [createBlankQuestion()];

    setCurrentList({ ...currentList, questions: updatedQuestions });
  };

  return (
    <QuestionCreatorWrapper>
      <ToolbarWrapper>
        <Button
          colour={Colour.YELLOW}
          onClick={() => {
            setCurrentList(createNewList());
          }}
        >
          Reset
        </Button>

        {areQuestionsValid && currentList.name && (
          <>
            <Button onClick={updateLists} colour={Colour.PRIMARY}>
              Save
            </Button>
            <StartButton type="button" onClick={handleStartClick}>
              Start Learning!
            </StartButton>
          </>
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
              setCurrentList({ ...currentList, name: listNameValue });
            }}
            error={listNameError}
          />
        </Label>
      </ListNameWrapper>

      <InnerWrapper>
        {currentList.questions.map((question) => (
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
