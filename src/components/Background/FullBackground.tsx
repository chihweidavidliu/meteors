import React, { FunctionComponent } from "react";
import styled from "styled-components";
import meteorImage from "../../assets/asteroid.png";
import worldImage from "../../assets/world.png";
import { StarryBackground } from "./StarryBackground";

const Image = styled.img`
  position: absolute;
  z-index: 0;
`;

const FullBackground: FunctionComponent = ({ children }) => {
  return (
    <StarryBackground>
      <Image
        src={meteorImage}
        style={{
          bottom: "50vh",
          left: "60vw",
        }}
      />

      <Image
        src={worldImage}
        style={{
          bottom: "-100px",
          left: "-100px",
        }}
      />
      {children}
    </StarryBackground>
  );
};

export default FullBackground;
