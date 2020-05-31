import styled from "styled-components";

export const H1 = styled.h1<{ fontSize?: string }>`
  margin: 0;
  font-size: ${(props) => props.fontSize || "36px"};
  z-index: 2;
`;
