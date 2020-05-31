import styled from "styled-components";

export const P = styled.polygon<{ fontSize?: string }>`
  margin: 0;
  font-size: ${(props) => props.fontSize || "18px"};
  z-index: 2;
`;
