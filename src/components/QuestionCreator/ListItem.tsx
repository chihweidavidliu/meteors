import React, { useState } from "react";
import styled from "styled-components";
import { IList } from "../../types/List";
import { useThemeContext } from "../../hooks/useThemeContext";
import { Button } from "../Button";
import { IQuestion } from "../../types/Question";
import { Label } from "../Label";
import { useQuestionContext } from "../../context/QuestionContext";
import { useHistory } from "react-router-dom";
import { getSavedLists } from "../../util/getSavedLists";
import { updateSavedLists } from "../../util/updateSavedLists";

const Wrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid lightgray;
`;

const TopBar = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
  align-items: center;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
  @media (max-width: 767px) {
    text-align: center;
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, max-content);
  grid-gap: 10px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    text-align: center;
  }
`;

const QuestionList = styled.div`
  display: grid;
  grid-gap: 10px;
  padding-top: 20px;
`;

const QuestionWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-gap: 20px;
`;

const Divider = styled.div`
  height: 100%;
  width: 2px;
  background: lightgray;
`;

interface IQuestionDetailProps {
  question: IQuestion;
}

const QuestionDetail = ({ question }: IQuestionDetailProps) => {
  return (
    <QuestionWrapper>
      <Label>
        Term <strong>{question.term}</strong>
      </Label>
      <Divider />
      <Label>
        Definition <strong>{question.definition}</strong>
      </Label>
    </QuestionWrapper>
  );
};

interface IListItemProps {
  list: IList;
  setLists: (lists: IList[]) => void;
}

const ListItem = ({ list, setLists }: IListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { primaryColour } = useThemeContext();
  const { setListName, setQuestions } = useQuestionContext();
  const history = useHistory();

  const handleDelete = () => {
    const savedLists = getSavedLists();
    const updated = savedLists.filter((savedList) => savedList.id !== list.id);
    updateSavedLists(updated);
    setLists(updated);
  };

  return (
    <Wrapper>
      <TopBar>
        <strong style={{ fontSize: "18px" }}>{list.name}</strong>
        <ButtonGrid>
          <Button
            onClick={() => {
              setListName(list.name);
              setQuestions(list.questions);
              history.push("/play");
            }}
          >
            Play
          </Button>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            buttonTheme={{
              primaryColour,
              hoverColour: "#2e3d49",
            }}
          >
            {isExpanded ? "Hide Terms" : "Show Terms"}
          </Button>

          <Button
            onClick={() => {
              setQuestions(list.questions);
              setListName(list.name);
            }}
            buttonTheme={{
              primaryColour: "#ffd800",
              hoverColour: "#d8bd20",
            }}
          >
            Edit
          </Button>
          <Button onClick={handleDelete} isDeleteButton>
            Delete
          </Button>
        </ButtonGrid>
      </TopBar>
      {isExpanded && (
        <QuestionList>
          {list.questions.map((question) => {
            return <QuestionDetail key={question.id} question={question} />;
          })}
        </QuestionList>
      )}
    </Wrapper>
  );
};

export default ListItem;
