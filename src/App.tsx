import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Nunito', sans-serif;
}
*, *:before, *:after {
  box-sizing: inherit;
}
  body {
    margin: 0;
    padding: 0;
    font-family: 'Nunito', sans-serif;
    color: white;
  }
`;

const theme = {
  primaryColour: "#00404f",
};

const AppWrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  grid-template-rows: max-content max-content max-content;
  grid-gap: 20px;
  background: ${(props) => props.theme.primaryColour};
  justify-items: center;
  padding: 40px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <GlobalStyle />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
