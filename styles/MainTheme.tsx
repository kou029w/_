import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { orange, teal } from "@material-ui/core/colors";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { MDXProvider } from "@mdx-js/react";
import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import TopAppBar from "./TopAppBar";

const isValidURL = (url: string) => {
  try {
    new URL(url);
  } catch {
    return false;
  }
  return true;
};

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
    fontFamily: "sans-serif"
  }
});

export const components = {
  h1: (props: { children: ReactNode }) => (
    <>
      <Head>
        <title>{props.children}</title>
      </Head>
      <Typography component="h1" variant="h3" {...props} />
    </>
  ),
  h2: (props: {}) => <Typography component="h2" variant="h4" {...props} />,
  h3: (props: {}) => <Typography component="h3" variant="h5" {...props} />,
  h4: (props: {}) => <Typography component="h4" variant="h6" {...props} />,
  h5: (props: {}) => <Typography component="h5" variant="h6" {...props} />,
  h6: (props: {}) => <Typography variant="h6" {...props} />,
  a: ({ href, ...props }: { href: string }) => {
    const url = isValidURL(href)
      ? href
      : `${process.env.NEXT_BASE_PATH}${href}`;

    return (
      <Link prefetch href={href} as={url}>
        <MuiLink variant="body1" color="secondary" href={url} {...props} />
      </Link>
    );
  }
};

const MainTheme: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <MDXProvider components={components}>
      <TopAppBar />
      <Box paddingTop={6}>
        <Container>
          <Typography component="div" variant="body1">
            {children}
          </Typography>
        </Container>
      </Box>
    </MDXProvider>
  </ThemeProvider>
);
export default MainTheme;
