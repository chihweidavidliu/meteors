import { createContext, useContext, SetStateAction } from "react";
import { IQuestion } from "../types/Question";
import { IList } from "../types/List";

interface IQuestionContextProps {
  savedLists: IList[];
  setSavedLists: (updated: IList[]) => void;
  listName: string;
  setListName: React.Dispatch<SetStateAction<string>>;
  questions: IQuestion[];
  setQuestions: React.Dispatch<SetStateAction<IQuestion[]>>;
  validateQuestions: () => boolean;
}

const initialprops: IQuestionContextProps = {
  savedLists: [],
  setSavedLists: () => {},
  listName: "",
  questions: [],
  setQuestions: () => {},
  setListName: () => {},
  validateQuestions: () => false,
};

const QuestionContext = createContext(initialprops);

const useQuestionContext = () => useContext(QuestionContext);

export { QuestionContext, useQuestionContext };
