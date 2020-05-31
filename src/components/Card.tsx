import styled from "styled-components";

interface ICardProps {
  fadeIn?: boolean;
}

const Card = styled.div<ICardProps>`
  background: whitesmoke;
  z-index: 2;
  width: 100%;
  padding: 40px;
  color: black;
  border-radius: 10px;
  box-shadow: 5px 5px 0px 2px rgba(0, 64, 79, 1);
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