import styled from "styled-components";

interface IButtonTheme {
  primaryColour?: string;
  hoverColour?: string;
  fontColour?: string;
}

interface IButtonProps {
  buttonTheme?: IButtonTheme;
}

export const Button = styled.button<IButtonProps>`
  font-size: 18px;
  padding: 10px;
  background: ${(props) =>
    props?.buttonTheme?.primaryColour || props.theme.green};
  color: ${(props) => props?.buttonTheme?.fontColour || `white`};
  border: none;
  border-radius: 4px;
  height: max-content;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover,
  &:focus {
    background: ${(props) => props?.buttonTheme?.hoverColour || `#17750a`};
  }

  &:focus {
    outline: none;
    border: 2px solid
      ${(props) => props?.buttonTheme?.primaryColour || props.theme.green};
  }
`;
