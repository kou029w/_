import "./boot";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import {
  CssBaseline,
  createMuiTheme,
  Typography,
  Link as MuiLink,
  Grid
} from "@material-ui/core";
import { orange, teal } from "@material-ui/core/colors";
import { MDXProvider } from "@mdx-js/tag";
import React from "react";
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
  h1: (props: {}) => <Typography component="h1" variant="h3" {...props} />,
  h2: (props: {}) => <Typography component="h2" variant="h4" {...props} />,
  h3: (props: {}) => <Typography component="h3" variant="h5" {...props} />,
  h4: (props: {}) => <Typography component="h4" variant="h6" {...props} />,
  h5: (props: {}) => <Typography component="h5" variant="h6" {...props} />,
  h6: (props: {}) => <Typography variant="h6" {...props} />,
  a: ({ href, ...props }: { href: string }) => (
    <Link prefetch href={href}>
      <MuiLink variant="body1" color="secondary" href={href} {...props} />
    </Link>
  )
};

const useStyles = makeStyles({
  container: {
    padding: [8, 3, 1].map(n => `${n * theme.spacing.unit}px`).join(" "),
    [theme.breakpoints.up("sm")]: {
      padding: [9, 4, 1].map(n => `${n * theme.spacing.unit}px`).join(" ")
    }
  }
});

const MainTheme: React.FC<{}> = ({ children }) => {
  const classes = useStyles();
  return (
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
          <Grid className={classes.container} container>
            {children}
          </Grid>
        </Typography>
      </MDXProvider>
    </ThemeProvider>
  );
};
export default MainTheme;
