import { createContext, useContext } from "react";
import { IQuestion } from "../types/Question";
import { IMeteorProps } from "../components/Meteor";

interface IGameContextProps {
  isStarted: boolean;
  setIsStarted: (isStarted: boolean) => void;
  screenWidth: number;
  screenHeight: number;
  inputValue: string;
  setInputValue: (value: string) => void;
  questions: IQuestion[];
  meteors: IMeteorProps[];
}

const initialprops: IGameContextProps = {
  isStarted: false,
  setIsStarted: () => {},
  screenWidth: 1000,
  screenHeight: 1000,
  inputValue: "",
  setInputValue: () => {},
  questions: [],
  meteors: [],
};

const GameContext = createContext(initialprops);

const useGameContext = () => useContext(GameContext);

export { GameContext, useGameContext };
