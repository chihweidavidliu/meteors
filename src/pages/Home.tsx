import React from "react";
import styled from "styled-components";
import { H1 } from "../typography/H1";
import { H2 } from "../typography/H2";
import starsImage from "../assets/stars.png";
import meteorImage from "../assets/asteroid.png";
import worldImage from "../assets/world.png";
import Card from "../components/Card";
import { P } from "../typography/P";

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 20px;
  justify-items: center;
  padding: 40px 0px;
`;

const Stars = styled.div`
  background: black url(${starsImage}) repeat;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  z-index: 0;
`;

const Image = styled.img`
  position: absolute;
  z-index: 0;
`;

const CardWrapper = styled.div`
  display: grid;
  width: 100%;
  padding: 40px;
  grid-template-columns: repeat(auto-fit, minmax(500px, 900px));
  justify-content: center;
  grid-gap: 40px;
`;

const Home = () => {
  return (
    <>
      <Stars />
      <Wrapper>
        <Image
          src={meteorImage}
          style={{
            bottom: "50vh",
            left: "60vw",
          }}
        />

        <Image
          src={worldImage}
          style={{
            bottom: "-100px",
            left: "-100px",
          }}
        />
        <H1 fontSize="64px">Meteors</H1>
        <P>A game to help remember things</P>

        <CardWrapper>
          <Card fadeIn>
            <H2>Welcome</H2>
            <p>Meteors are hurtling towards Earth. Only you can save us...</p>
          </Card>
          <Card fadeIn>
            <H2>Create Flash Cards</H2>
          </Card>
        </CardWrapper>
      </Wrapper>
    </>
  );
};

export default Home;
