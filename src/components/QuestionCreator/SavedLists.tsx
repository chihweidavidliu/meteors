import React from "react";
import styled from "styled-components";
import { IList } from "../../types/List";
import ListItem from "./ListItem";
import { P } from "../../typography/P";
import { useQuestionContext } from "../../context/QuestionContext";

const Wrapper = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-gap: 15px;
`;

const SavedLists = () => {
  const { savedLists, setSavedLists: updateSavedLists } = useQuestionContext();

  return (
    <Wrapper>
      {savedLists.length > 0 ? (
        savedLists.map((list) => {
          return (
            <ListItem
              key={list.id}
              list={list}
              setLists={(lists: IList[]) => updateSavedLists(lists)}
            />
          );
        })
      ) : (
        <P noMargin>
          You don't have any saved lists. Create one using the box on the left!
        </P>
      )}
    </Wrapper>
  );
};

export default SavedLists;
