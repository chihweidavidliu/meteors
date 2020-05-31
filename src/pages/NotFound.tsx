import React from "react";
import FullBackground from "../components/Background/FullBackground";
import { H1 } from "../typography/H1";
import { H2 } from "../typography/H2";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();
  return (
    <FullBackground>
      <H1 fontSize="64px">Ooops</H1>

      <H2>This page doesn't seem to exist</H2>
      <Button onClick={() => history.push("/")}>Take Me Home</Button>
    </FullBackground>
  );
};

export default NotFound;
