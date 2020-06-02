import React from "react";
import styled from "styled-components";
import { H1 } from "../typography/H1";
import { H2 } from "../typography/H2";
import Card from "../components/Card";
import { P } from "../typography/P";
import QuestionCreator from "../components/QuestionCreator/QuestionCreator";
import FullBackground from "../components/Background/FullBackground";
import SavedLists from "../components/QuestionCreator/SavedLists";

const CardWrapper = styled.div`
  display: grid;
  width: 100%;
  padding: 40px;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: max-content;
  justify-content: center;
  grid-gap: 40px;
  @media (max-width: 1024px) {
    grid-gap: 20px;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    padding: 10px;
  }
`;

const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  height: 45px;
  align-items: center;
`;

const Home = () => {
  return (
    <FullBackground>
      <H1 fontSize="64px">Meteors</H1>
      <P>A game to help remember things</P>

      <CardWrapper>
        <Card fadeIn isWrapped span="2">
          <H2>Welcome</H2>
          <P>
            Meteors are hurtling towards Earth. Only you can save humanity...
          </P>
          <P>
            Meteors helps you learn in an interactive way. Just input or upload
            the words you wish to learn with their definition (they could be
            anything - scientific terms, French verbs, important dates).
          </P>
        </Card>
        <Card fadeIn isWrapped>
          <TitleWrapper>
            <H2>Create Questions</H2>
          </TitleWrapper>
          <QuestionCreator />
        </Card>

        <Card fadeIn isWrapped>
          <TitleWrapper>
            <H2>Saved Lists</H2>
          </TitleWrapper>

          <SavedLists />
        </Card>
      </CardWrapper>
    </FullBackground>
  );
};

export default Home;
