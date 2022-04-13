import { DefaultTheme } from "styled-components";

/* DefaultTheme이라고 type을 정해줌으로써 내부의 변수들을 자동완성 시켜줄 수 있다 */
export const lightTheme: DefaultTheme = {
  textColor: "#130f40",
  bgColor: "#c7ecee",
  accentColor: "#5f27cd",
};
export const darkTheme: DefaultTheme = {
  textColor: "#fff200",
  bgColor: "#574b90",
  accentColor: "#4cd137",
};
