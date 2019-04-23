import React from "react";
import App, { Container } from "next/app";
import MainTheme from "../styles/MainTheme";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <MainTheme>
          <Component {...pageProps} />
        </MainTheme>
      </Container>
    );
  }
}
