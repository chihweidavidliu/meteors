import React, { useState, FunctionComponent } from "react";
import styled from "styled-components";
import { InfoIcon } from "./Icons/InfoIcon";

const Wrapper = styled.div`
  position: relative;
  display: inline;
`;

const PopupWrapper = styled.div`
  position: absolute;
  bottom: 125%;
  width: 200px;
  right: -100px;
  background: whitesmoke;
  padding: 15px;
  border: 1px solid lightgray;
  border-radius: 10px;
  color: black;

  @media (max-width: 767px) {
    right: 0;
  }
`;

const Tooltip: FunctionComponent = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Wrapper
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <InfoIcon />
      {isHovered && <PopupWrapper>{children}</PopupWrapper>}
    </Wrapper>
  );
};

export default Tooltip;
