import styled from "styled-components";
import starsImage from "../../assets/stars.png";

export const StarryBackground = styled.div`
  position: absolute;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 20px;
  justify-items: center;
  padding: 40px 0px;
  background: black url(${starsImage}) repeat;
`;
