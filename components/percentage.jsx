import { Component } from "react";

export default class extends Component {
  render() {
    const leftActivity = this.props.activity
      .filter(a => a.ch === "l")
      .map(a => a.endTime - a.startTime)
      .reduce((a, c) => a + c, 0);
    const rightActivity = this.props.activity
      .filter(a => a.ch === "r")
      .map(a => a.endTime - a.startTime)
      .reduce((a, c) => a + c, 0);

    return (
      <dl>
        <dt>会話時間 (ms)</dt>
        <dd>{leftActivity + rightActivity}</dd>
        <dt>会話の割合</dt>
        <dd>
          左{" "}
          <meter value={leftActivity / (leftActivity + rightActivity)}>
            {leftActivity / (leftActivity + rightActivity)}
          </meter>{" "}
          右
        </dd>
      </dl>
    );
  }
}
