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
  transition: transform 0.1s;
`;

const Laser = styled.div<{ rotation: number }>`
  position: absolute;
  height: 40px;
  width: 10px;
  background: green;
  transform-origin: bottom;
  transform: rotate(${(props) => props.rotation}deg);
  transition: transform 0.2s;
`;

const Cannon = () => {
  const { screenWidth, cannonRotation, isCannonFiring } = useGameContext();
  return (
    <>
      <Barrel screenWidth={screenWidth} rotation={cannonRotation}>
        {isCannonFiring && <Laser rotation={cannonRotation} />}
      </Barrel>
      <CannonWrapper screenWidth={screenWidth}></CannonWrapper>
    </>
  );
};

export default Cannon;
