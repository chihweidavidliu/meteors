import styled from "styled-components";
import starsImage from "../../assets/stars.png";

interface IStarryBackgroundProps {
  noPadding?: boolean;
}
export const StarryBackground = styled.div<IStarryBackgroundProps>`
  position: absolute;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 20px;
  justify-items: center;
  padding: ${(props) => (props.noPadding ? "0px" : "40px 0px")};
  background: black url(${starsImage}) repeat;
`;
