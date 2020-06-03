import React from "react";
import { ToastProps, Placement } from "react-toast-notifications";
import styled from "styled-components";
import { Colour } from "../types/Colour";

const StyledCard = styled.div<{ colour?: string }>`
  padding: 20px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  background: ${(props) => {
    switch (props.colour) {
      case Colour.RED:
        return props.theme.red;
      case Colour.GREEN:
        return props.theme.green;
      default:
        return "whitesmoke";
    }
  }};

  border: ${(props) => {
    switch (props.colour) {
      case Colour.RED:
        return `2px solid ${props.theme.darkRed}`;
      case Colour.GREEN:
        return `2px solid ${props.theme.darkGreen}`;
      default:
        return "2px solid lightgray";
    }
  }};
  margin: 10px;
  color: ${(props) => (props.colour ? "white" : "black")};
`;

function getTranslate(placement: Placement) {
  const pos = placement.split("-");
  const relevantPlacement = pos[1] === "center" ? pos[0] : pos[1];
  const translateMap: { [index: string]: string } = {
    right: "translate3d(120%, 0, 0)",
    left: "translate3d(-120%, 0, 0)",
    bottom: "translate3d(0, 125%, 0)",
    top: "translate3d(0, -120%, 0)",
  };

  return translateMap[relevantPlacement];
}

const toastStates = (placement: Placement) => ({
  entering: { transform: getTranslate(placement) },
  entered: { transform: "translate3d(0,0,0)" },
  exiting: { transform: "scale(0.66)", opacity: 0 },
  exited: { transform: "scale(0.66)", opacity: 0 },
});

const Toast = ({
  children,
  appearance,
  transitionDuration,
  transitionState,
  placement,
}: ToastProps) => {
  const getColour = (appearance: string) => {
    switch (appearance) {
      case "error":
        return Colour.RED;
      case "success":
        return Colour.GREEN;
      default:
        return "";
    }
  };

  return (
    <StyledCard
      style={{
        boxShadow: "0 3px 8px rgba(0, 0, 0, 0.175)",
        marginBottom: "8px",
        transition: `transform ${transitionDuration}ms cubic-bezier(0.2, 0, 0, 1), opacity ${transitionDuration}ms`,
        ...toastStates(placement)[transitionState],
      }}
      colour={getColour(appearance)}
    >
      {children}
    </StyledCard>
  );
};

export default Toast;
