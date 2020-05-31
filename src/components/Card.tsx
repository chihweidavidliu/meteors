import styled from "styled-components";

interface ICardProps {
  fadeIn?: boolean;
  background?: string;
  boxShadowColour?: string;
}

const Card = styled.div<ICardProps>`
  background: ${(props) => props.background || "whitesmoke"};
  z-index: 2;
  width: 100%;
  padding: 40px;
  color: black;
  border-radius: 10px;
  box-shadow: 5px 5px 0px 2px
    ${(props) => props.boxShadowColour || props.theme.primaryColour};
  ${(props) => props.fadeIn && "animation: fadeIn 2s;"}

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

export default Card;
