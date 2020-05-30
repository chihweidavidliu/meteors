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

const Barrel = styled.div<{ screenWidth: number }>`
  background: lightgrey;
  height: 50px;
  width: 20px;
  position: absolute;
  left: ${(props) => `${props.screenWidth / 2 - 10}px`};
  bottom: 50px;
  border-radius: 10% 10% 0 0;
`;

const Cannon = () => {
  const { screenWidth } = useGameContext();
  return (
    <>
      <Barrel screenWidth={screenWidth} />
      <CannonWrapper screenWidth={screenWidth}></CannonWrapper>
    </>
  );
};

export default Cannon;
