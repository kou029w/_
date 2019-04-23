import React from "react";
import App, { Container } from "next/app";
import MainTheme from "../styles/MainTheme";
import TopAppBar from "../styles/TopAppBar";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <MainTheme>
          <TopAppBar />
          <Component {...pageProps} />
        </MainTheme>
      </Container>
    );
  }
}
