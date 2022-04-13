import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { lightTheme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      {/* <ThemeProvider> 컴포넌트의 하위 컴포넌트는 theme 변수를 사용할 수 있다. */}
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
