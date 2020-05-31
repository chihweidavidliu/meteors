import styled from "styled-components";

export const P = styled.p<{ fontSize?: string }>`
  font-size: ${(props) => props.fontSize || "18px"};
  z-index: 2;
`;
