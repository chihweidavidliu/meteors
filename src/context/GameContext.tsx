import { createContext, useContext } from "react";
import { IQuestion } from "../types/Question";

interface IGameContextProps {
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
  screenWidth: number;
  screenHeight: number;
  meteorSize: number;
  inputValue: string;
  setInputValue: (value: string) => void;
  questions: IQuestion[];
  score: number;
}

const initialprops: IGameContextProps = {
  isStarted: false,
  setIsStarted: () => {},
  meteorSize: 10,
  screenWidth: 1000,
  screenHeight: 1000,
  inputValue: "",
  setInputValue: () => {},
  questions: [],
  score: 0,
};

const GameContext = createContext(initialprops);

const useGameContext = () => useContext(GameContext);

export { GameContext, useGameContext };
