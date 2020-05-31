import React, { useState, createRef, ChangeEvent } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  font-size: 18px;
  width: 100%;
  padding: 8px;

  &:focus {
    outline: 1px solid ${(props) => props.theme.primaryColour};
  }
`;

const ErrorBox = styled.div`
  height: 10px;
  font-size: 12px;
  color: ${(props) => props.theme.red};
  margin-top: 5px;
`;

interface InputProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  blurOnEnter?: boolean;
  error?: string;
}

const Input = ({
  handleChange,
  value,
  blurOnEnter,
  placeholder,
  handleBlur,
  error,
}: InputProps) => {
  const [ref] = useState(createRef<HTMLInputElement>());

  return (
    <Wrapper>
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
      <ErrorBox>{error}</ErrorBox>
    </Wrapper>
  );
};

export default Input;
