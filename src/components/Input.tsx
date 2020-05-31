import React, { useState, createRef, ChangeEvent } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  font-size: 18px;
  padding: 8px;

  &:focus {
    outline: 1px solid ${(props) => props.theme.primaryColour};
  }
`;

interface InputProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  blurOnEnter?: boolean;
}

const Input = ({
  handleChange,
  value,
  blurOnEnter,
  placeholder,
  handleBlur,
}: InputProps) => {
  const [ref] = useState(createRef<HTMLInputElement>());

  return (
    <StyledInput
      ref={ref}
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter" && blurOnEnter) {
          ref?.current?.blur();
        }
      }}
    />
  );
};

export default Input;
