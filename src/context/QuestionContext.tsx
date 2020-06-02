import { createContext, useContext, SetStateAction } from "react";
import { IQuestion } from "../types/Question";

interface IQuestionContextProps {
  listName: string;
  setListName: React.Dispatch<SetStateAction<string>>;
  questions: IQuestion[];
  setQuestions: React.Dispatch<SetStateAction<IQuestion[]>>;
  validateQuestions: () => boolean;
}

const initialprops: IQuestionContextProps = {
  listName: "",
  questions: [],
  setQuestions: () => {},
  setListName: () => {},
  validateQuestions: () => false,
};

const QuestionContext = createContext(initialprops);

const useQuestionContext = () => useContext(QuestionContext);

export { QuestionContext, useQuestionContext };
