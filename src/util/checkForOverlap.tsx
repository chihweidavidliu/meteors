import { IPosition } from "../types/Position";

export const checkForOverlap = (
  positionToTest: IPosition,
  existingPositions: IPosition[]
) => {
  const clash = existingPositions.find(
    (pixel) =>
      pixel.positionX === positionToTest.positionX &&
      pixel.positionY === positionToTest.positionY
  );

  return clash ? true : false;
};
