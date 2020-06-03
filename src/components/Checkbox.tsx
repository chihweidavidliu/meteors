import React from "react";
import styled from "styled-components";
import { P } from "../typography/P";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  input {
    margin: 0px 15px;
  }
  @media (max-width: 376px) {
    justify-content: center;
  }
`;

interface ICheckboxProps {
  handleChange: () => void;
  isChecked: boolean;
  id: string;
  label: string;
}

const Checkbox = ({ id, handleChange, isChecked, label }: ICheckboxProps) => {
  return (
    <Wrapper>
      <input
        type="checkbox"
        id={id}
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor={id}>
        <P noMargin>{label}</P>
      </label>
    </Wrapper>
  );
};

export default Checkbox;
