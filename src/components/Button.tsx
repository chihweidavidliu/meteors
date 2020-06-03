import styled from "styled-components";
import { Colour } from "../types/Colour";

interface IButtonTheme {
  primaryColour?: string;
  hoverColour?: string;
  fontColour?: string;
}

interface IButtonProps {
  buttonTheme?: IButtonTheme;
  colour?: Colour;
  disabled?: boolean;
}

export const Button = styled.button<IButtonProps>`
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  background: ${(props) => {
    switch (props.colour) {
      case Colour.PRIMARY:
        return props.theme.primaryColour;
      case Colour.RED:
        return props.theme.red;
      case Colour.BLUE:
        return props.theme.blue;
      case Colour.YELLOW:
        return props.theme.yellow;
      default:
        return props?.buttonTheme?.primaryColour || props.theme.green;
    }
  }};
  color: ${(props) => props?.buttonTheme?.fontColour || `white`};
  border: none;
  border-radius: 4px;
  height: max-content;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover,
  &:focus {
    background: ${(props) => {
      switch (props.colour) {
        case Colour.PRIMARY:
          return props.theme.primaryDark;
        case Colour.RED:
          return props.theme.darkRed;
        case Colour.BLUE:
          return props.theme.darkBlue;
        case Colour.YELLOW:
          return props.theme.darkYellow;
        default:
          return props?.buttonTheme?.hoverColour || `#17750a`;
      }
    }};
  }

  &:focus {
    outline: none;
    border: 2px solid
      ${(props) => {
        switch (props.colour) {
          case Colour.PRIMARY:
            return props.theme.primaryColour;
          case Colour.RED:
            return props.theme.red;
          case Colour.BLUE:
            return props.theme.blue;
          case Colour.YELLOW:
            return props.theme.yellow;
          default:
            return props?.buttonTheme?.primaryColour || props.theme.green;
        }
      }};
  }
`;
