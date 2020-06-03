import styled from "styled-components";
import Card from "./Card";

export const ModalWrapper = styled(Card)`
  position: fixed;
  width: 500px;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  justify-content: center;
  text-align: center;
  z-index: 5;

  @media (max-width: 767px) {
    width: 90vw;
  }
`;
