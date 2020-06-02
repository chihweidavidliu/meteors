import styled from "styled-components";

export const P = styled.p<{ fontSize?: string; noMargin?: boolean }>`
  font-size: ${(props) => props.fontSize || "18px"};
  ${(props) => props.noMargin && "margin: 0;"}
  z-index: 2;
`;
