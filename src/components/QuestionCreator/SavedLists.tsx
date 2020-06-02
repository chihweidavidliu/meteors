import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IList } from "../../types/List";
import { getSavedLists } from "../../util/getSavedLists";
import ListItem from "./ListItem";
import { P } from "../../typography/P";

const Wrapper = styled.div`
  padding: 20px 0px;
  display: grid;
  grid-gap: 15px;
`;

const SavedLists = () => {
  const [lists, setLists] = useState<IList[]>([]);

  useEffect(() => {
    const savedLists = getSavedLists();
    setLists(() => savedLists);
  }, []);

  return (
    <Wrapper>
      {lists.length > 0 ? (
        lists.map((list) => {
          return (
            <ListItem
              key={list.id}
              list={list}
              setLists={(lists: IList[]) => setLists(lists)}
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
