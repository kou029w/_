import "./boot";
import { ThemeProvider } from "@material-ui/styles";
import {
  CssBaseline,
  createMuiTheme,
  Typography,
  Link as MuiLink,
  Grid
} from "@material-ui/core";
import { orange, teal } from "@material-ui/core/colors";
import { MDXProvider } from "@mdx-js/tag";
import React, { ReactElement } from "react";
import Head from "next/head";
import Link from "next/link";
import TopAppBar from "./TopAppBar";

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

export const components = {
  h1: (props: {}) => <Typography variant="h1" {...props} />,
  h2: (props: {}) => <Typography variant="h2" {...props} />,
  h3: (props: {}) => <Typography variant="h3" {...props} />,
  h4: (props: {}) => <Typography variant="h4" {...props} />,
  h5: (props: {}) => <Typography variant="h5" {...props} />,
  h6: (props: {}) => <Typography variant="h6" {...props} />,
  a: ({ href, ...props }: { href: string }) => (
    <Link href={href}>
      <MuiLink variant="body1" href={href} {...props} />
    </Link>
  )
};

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
    <MDXProvider components={components}>
      <Typography component="div" variant="body1">
        <TopAppBar />
        <Grid container>{children}</Grid>
      </Typography>
    </MDXProvider>
  </ThemeProvider>
);
export default MainTheme;
