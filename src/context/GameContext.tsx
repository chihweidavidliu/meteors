import { createContext, useContext } from "react";
import { IQuestion } from "../types/Question";

interface IGameContextProps {
  isStarted: boolean;
  areTermsAndDefsSwapped: boolean;
  setIsStarted: (isStarted: boolean) => void;
  screenWidth: number;
  screenHeight: number;
  meteorSize: number;
  inputValue: string;
  setInputValue: (value: string) => void;
  questions: IQuestion[];
  score: number;
  lastDestroyed: IQuestion | null;
  cannonRotation: number;
  setCannonRotation: (angle: number) => void;
  isCannonFiring: boolean;
  laserLength: number;
  fireCannon: (angle: number, laserLength: number) => void;
  destroyMeteor: (destroyed: IQuestion) => void;
  areResultsVisible: boolean;
  setAreResultsVisible: (areVisible: boolean) => void;
  endGame: () => void;
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
  lastDestroyed: null,
  cannonRotation: 0,
  setCannonRotation: () => {},
  isCannonFiring: false,
  laserLength: 0,
  fireCannon: () => {},
  destroyMeteor: () => {},
  areResultsVisible: false,
  setAreResultsVisible: () => {},
  endGame: () => {},
  areTermsAndDefsSwapped: false,
};

const GameContext = createContext(initialprops);

const useGameContext = () => useContext(GameContext);

export { GameContext, useGameContext };
