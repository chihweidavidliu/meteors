import { createContext, useContext } from "react";
import { IList } from "../types/List";
import { createNewList } from "../util/createNewList";

interface IListContextProps {
  savedLists: IList[];
  setSavedLists: (updated: IList[]) => void;
  currentList: IList;
  setCurrentList: (list: IList) => void;
  validateQuestions: () => {
    hasSomeEntries: boolean;
    areQuestionsValid: boolean;
  };
}

const initialprops: IListContextProps = {
  savedLists: [],
  setSavedLists: () => {},
  currentList: createNewList(),
  setCurrentList: () => {},
  validateQuestions: () => ({
    hasSomeEntries: false,
    areQuestionsValid: false,
  }),
};

const ListContext = createContext(initialprops);

const useListContext = () => useContext(ListContext);

export { ListContext, useListContext };
