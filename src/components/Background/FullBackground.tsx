import React, { FunctionComponent } from "react";
import { ImageElement } from "./ImageElement";
import meteorImage from "../../assets/asteroid.png";
import worldImage from "../../assets/world.png";
import { StarryBackground } from "./StarryBackground";

const FullBackground: FunctionComponent = ({ children }) => {
  return (
    <StarryBackground>
      <ImageElement
        src={meteorImage}
        style={{
          top: "10vh",
          left: "60vw",
        }}
      />

      <ImageElement
        src={worldImage}
        style={{
          top: "70vh",
          left: "-100px",
        }}
      />
      {children}
    </StarryBackground>
  );
};

export default FullBackground;
