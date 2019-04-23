import "./boot";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, createMuiTheme } from "@material-ui/core";
import { orange, teal } from "@material-ui/core/colors";
import React from "react";
import Head from "next/head";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: orange[900]
    },
    secondary: {
      main: teal[400]
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: '"Noto Sans JP", "Helvetica", "Arial", sans-serif'
  }
});

const MainTheme: React.FC<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Head>
      <meta
        name="viewport"
        content="width=device-width,minimum-scale=1,initial-scale=1"
      />
      <meta name="theme-color" content={theme.palette.primary.main} />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Noto+Sans+JP"
      />
    </Head>
    <CssBaseline />
    {children}
  </ThemeProvider>
);
export default MainTheme;
