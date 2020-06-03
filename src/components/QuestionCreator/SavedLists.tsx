import React from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import { P } from "../../typography/P";
import { useListContext } from "../../context/ListContext";

const Wrapper = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-gap: 15px;
`;

const SavedLists = () => {
  const { savedLists } = useListContext();

  return (
    <Wrapper>
      {savedLists.length > 0 ? (
        savedLists.map((list) => {
          return <ListItem key={list.id} list={list} />;
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
