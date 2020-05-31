import React from "react";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";

const CannonWrapper = styled.div<{ screenWidth: number }>`
  position: absolute;
  height: 60px;
  width: 60px;
  background: grey;
  left: ${(props) => `${props.screenWidth / 2 - 30}px`};
  bottom: 0px;
  border-radius: 50% 50% 0 0;
  z-index: 2;
`;

const Barrel = styled.div<{ screenWidth: number; rotation: number }>`
  background: lightgrey;
  height: 50px;
  width: 20px;
  position: absolute;
  left: ${(props) => `${props.screenWidth / 2 - 10}px`};
  bottom: 50px;
  border-radius: 10% 10% 0 0;
  transform-origin: bottom;
  transform: rotate(${(props) => props.rotation}deg);
`;

const Laser = styled.div<{ laserLength: number }>`
  position: absolute;
  bottom: 50px;
  left: 7px;
  height: ${(props) => `${props.laserLength}px`};
  width: 6px;

  border-radius: 4px 4px 0px 0px;
  animation: shoot 0.7s;
  @keyframes shoot {
    0% {
      background: green;
      opacity: 0;
      border: 2px solid transparent;
    }
    75% {
      opacity: 1;
      background: green;
      border: 2px solid lightgreen;
    }
    100% {
      opacity: 0;
      border: 2px solid transparent;
    }
  }
`;

const Cannon = () => {
  const {
    screenWidth,
    cannonRotation,
    isCannonFiring,
    laserLength,
    meteorSize,
  } = useGameContext();
  return (
    <>
      <Barrel screenWidth={screenWidth} rotation={cannonRotation}>
        {isCannonFiring && <Laser laserLength={laserLength - meteorSize / 2} />}
      </Barrel>
      <CannonWrapper screenWidth={screenWidth}></CannonWrapper>
    </>
  );
};

export default Cannon;
