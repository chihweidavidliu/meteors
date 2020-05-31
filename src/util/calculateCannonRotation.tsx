import { radiansToDegrees } from "./radiansToDegrees";

export const calculateCannonRotation = (
  meteorElement: HTMLElement,
  screenWidth: number,
  meteorSize: number
) => {
  const cannonPosition = { positionY: 50, positionX: screenWidth / 2 };

  if (!meteorElement.dataset.positionX || !meteorElement.dataset.positionY) {
    return { theta: 0, hypotenuse: 1000 };
  }

  // get meteor bottom-left coordinates and calculate center coordinates by adjusting for meteor size
  const meteorPositionX =
    parseInt(meteorElement.dataset.positionX) + meteorSize / 2;
  const meteorPositionY =
    parseInt(meteorElement.dataset.positionY) + meteorSize / 2;

  if (cannonPosition.positionX === meteorPositionX) {
    // shorting straight up
    return { theta: 0, hypotenuse: meteorPositionY - 50 };
  } else if (meteorPositionY <= 50) {
    // shooting below gun pivot point

    const adjacentLength = 50 - meteorPositionY;
    const oppositeLength = meteorPositionX - cannonPosition.positionX;

    const theta = radiansToDegrees(Math.atan(oppositeLength / adjacentLength));

    const sign = Math.sign(oppositeLength);
    const isNegative = sign === -1;
    const result = isNegative ? -180 - theta : 180 - theta;

    const hypotenuse = Math.sqrt(
      Math.pow(adjacentLength, 2) + Math.pow(oppositeLength, 2)
    );

    return { theta: result, hypotenuse };
  } else {
    // shooting at any other angle
    const oppositeLength = meteorPositionX - cannonPosition.positionX;

    const adjacentLength = meteorPositionY - 50;
    const theta = radiansToDegrees(Math.atan(oppositeLength / adjacentLength));

    const hypotenuse = Math.sqrt(
      Math.pow(adjacentLength, 2) + Math.pow(oppositeLength, 2)
    );

    return { theta, hypotenuse };
  }
};
