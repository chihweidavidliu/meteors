import React, { useState } from "react";
import styled from "styled-components";
import { IList } from "../../types/List";
import { Button } from "../Button";
import { IQuestion } from "../../types/Question";
import { Label } from "../Label";
import { useListContext } from "../../context/ListContext";
import { useHistory } from "react-router-dom";
import { Colour } from "../../types/Colour";

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
}

const ListItem = ({ list }: IListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { setCurrentList, deleteList } = useListContext();
  const history = useHistory();

  return (
    <Wrapper>
      <TopBar>
        <strong style={{ fontSize: "18px" }}>{list.name}</strong>
        <ButtonGrid>
          <Button
            onClick={() => {
              setCurrentList(list);
              history.push("/play");
            }}
          >
            Play
          </Button>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            colour={Colour.PRIMARY}
          >
            {isExpanded ? "Hide Terms" : "Show Terms"}
          </Button>

          <Button
            onClick={() => {
              setCurrentList(list);
            }}
            colour={Colour.YELLOW}
          >
            Edit
          </Button>
          <Button onClick={() => deleteList(list)} colour={Colour.RED}>
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
