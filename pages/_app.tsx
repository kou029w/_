import React from "react";
import App from "next/app";
import MainTheme from "../styles/MainTheme";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <MainTheme>
        <Component {...pageProps} />
      </MainTheme>
    );
  }
}
