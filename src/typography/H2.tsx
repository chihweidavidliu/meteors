import styled from "styled-components";

export const H2 = styled.h2<{ fontSize?: string }>`
  margin: 0;
  font-size: ${(props) => props.fontSize || "24px"};
  z-index: 2;
`;
