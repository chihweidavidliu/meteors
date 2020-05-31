import React from "react";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";

const CannonWrapper = styled.div<{ screenWidth: number }>`
  position: absolute;
  height: 60px;
  width: 60px;
  background: rgb(128, 128, 128);
  background: linear-gradient(
    90deg,
    rgba(128, 128, 128, 1) 0%,
    rgba(59, 59, 59, 1) 76%,
    rgba(56, 56, 56, 1) 100%
  );
  left: ${(props) => `${props.screenWidth / 2 - 30}px`};
  bottom: 0px;
  border-radius: 50% 50% 0 0;
  z-index: 2;
  border: 2px solid #4c4c4c;
`;

const CannonHiglight = styled.div`
  position: absolute;
  width: 5px;
  height: 20px;
  background: lightgray;
  bottom: 10px;
  border-radius: 5px;
  left: 4px;
`;

const Barrel = styled.div<{ screenWidth: number; rotation: number }>`
  background: rgb(211, 211, 211);
  background: linear-gradient(
    90deg,
    rgba(211, 211, 211, 1) 0%,
    rgba(135, 135, 135, 1) 76%,
    rgba(101, 101, 101, 1) 100%
  );
  height: 50px;
  width: 20px;
  position: absolute;
  left: ${(props) => `${props.screenWidth / 2 - 10}px`};
  bottom: 50px;
  border-radius: 10% 10% 0 0;
  transform-origin: bottom;
  transform: rotate(${(props) => props.rotation}deg);
  border: 2px solid gray;
`;

const BarrelHighlight = styled.div`
  position: absolute;
  width: 2px;
  height: 30px;
  background: #e2e2e2;
  bottom: 10px;
  border-radius: 5px;
  left: 3px;
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
        <BarrelHighlight />
      </Barrel>
      <CannonWrapper screenWidth={screenWidth}>
        <CannonHiglight />
      </CannonWrapper>
    </>
  );
};

export default Cannon;
