import { getRandomInt } from "./getRandomInt";
import { checkForOverlap } from "./checkForOverlap";
import { IPosition } from "../types/Position";

export const generateRandomPosition = (
  screenHeight: number,
  screenWidth: number,
  meteorSize: number,
  existingPositions?: IPosition[]
): IPosition => {
  const unitsAvailable = Math.round(screenWidth / meteorSize);
  const positionX = getRandomInt(unitsAvailable) * meteorSize;
  const positionY = screenHeight;
  const position = { positionX, positionY };

  if (existingPositions) {
    const clash = checkForOverlap(position, existingPositions);
    if (clash) {
      return generateRandomPosition(
        screenHeight,
        screenWidth,
        meteorSize,
        existingPositions
      );
    }
  }

  return position;
};
