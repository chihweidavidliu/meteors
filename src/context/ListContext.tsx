import React, { useState, FunctionComponent, useEffect } from "react";
import shortid from "shortid";
import { createContext, useContext } from "react";
import { IList } from "../types/List";
import { createNewList } from "../util/createNewList";
import { getSavedLists } from "../util/getSavedLists";
import { updateSavedLists } from "../util/updateSavedLists";

interface IListContextProps {
  savedLists: IList[];
  updateLists: (updated: IList) => void;
  deleteList: (list: IList) => void;
  currentList: IList;
  setCurrentList: (list: IList) => void;
  validateQuestions: () => {
    hasSomeEntries: boolean;
    areQuestionsValid: boolean;
  };
}

const initialprops: IListContextProps = {
  savedLists: [],
  updateLists: () => {},
  deleteList: () => {},
  currentList: createNewList(),
  setCurrentList: () => {},
  validateQuestions: () => ({
    hasSomeEntries: false,
    areQuestionsValid: false,
  }),
};

const ListContext = createContext(initialprops);

const useListContext = () => useContext(ListContext);

const ListProvider: FunctionComponent = ({ children }) => {
  const [savedLists, setSavedLists] = useState<IList[]>([]);
  const [currentList, setCurrentList] = useState<IList>(createNewList());

  useEffect(() => {
    const savedLists = getSavedLists();
    setSavedLists(() => savedLists);
  }, []);

  const validateQuestions = () => {
    let areQuestionsValid = true;
    let hasSomeEntries = false;

    currentList.questions.forEach((question) => {
      if (!question.definition || !question.term) {
        areQuestionsValid = false;
      }
      if (question.definition || question.term) {
        hasSomeEntries = true;
      }
    });

    return { areQuestionsValid, hasSomeEntries };
  };

  const updateLists = (updatedList: IList) => {
    const hasListPreviouslyBeenSaved = savedLists.find(
      (list) => list.name === updatedList.name
    );

    const updatedLists: IList[] = hasListPreviouslyBeenSaved
      ? savedLists.map((savedList) => {
          if (savedList.name === updatedList.name) {
            return { ...savedList, questions: updatedList.questions };
          }
          return savedList;
        })
      : [
          ...savedLists,
          {
            id: shortid.generate(),
            name: updatedList.name,
            questions: updatedList.questions,
          },
        ];

    // set in state
    setSavedLists(updatedLists);
    // save to local storage
    updateSavedLists(updatedLists);
  };

  const deleteList = (listToDelete: IList) => {
    const updated = savedLists.filter(
      (savedList) => savedList.id !== listToDelete.id
    );
    updateSavedLists(updated);
    setSavedLists(updated);
  };

  return (
    <ListContext.Provider
      value={{
        currentList,
        setCurrentList: (list: IList) => setCurrentList(list),
        validateQuestions,
        savedLists,
        updateLists,
        deleteList,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export { ListContext, useListContext, ListProvider };
