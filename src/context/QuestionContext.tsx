import { createContext, useContext, SetStateAction } from "react";
import { IQuestion } from "../types/Question";

interface IQuestionContextProps {
  questions: IQuestion[];
  setQuestions: React.Dispatch<SetStateAction<IQuestion[]>>;
  validateQuestions: () => boolean;
}

const initialprops: IQuestionContextProps = {
  questions: [],
  setQuestions: () => {},
  validateQuestions: () => false,
};

const QuestionContext = createContext(initialprops);

const useQuestionContext = () => useContext(QuestionContext);

export { QuestionContext, useQuestionContext };
