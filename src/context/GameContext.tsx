import { createContext, useContext } from "react";
import { IQuestion } from "../types/Question";

interface IGameContextProps {
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
  screenWidth: number;
  screenHeight: number;
  inputValue: string;
  setInputValue: (value: string) => void;
  questions: IQuestion[];
}

const initialprops: IGameContextProps = {
  isStarted: false,
  setIsStarted: () => {},
  screenWidth: 1000,
  screenHeight: 1000,
  inputValue: "",
  setInputValue: () => {},
  questions: [],
};

const GameContext = createContext(initialprops);

const useGameContext = () => useContext(GameContext);

export { GameContext, useGameContext };
