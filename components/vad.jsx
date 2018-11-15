import { Component } from "react";
import * as _VAD from "vad.js/lib/vad.js";

export default class extends Component {
  state = {
    audioContext: new AudioContext(),
    audioStream: null,
    left: null,
    right: null,
    activity: []
  };

  componentDidMount() {
    const audioContext = this.state.audioContext;
    const leftNode = audioContext.createGain();
    const rightNode = audioContext.createGain();
    const splitter = audioContext.createChannelSplitter(2);

    splitter.connect(
      leftNode,
      0
    );
    splitter.connect(
      rightNode,
      1
    );

    const start = stream => {
      this.setState({ audioStream: stream });
      audioContext.createMediaStreamSource(stream).connect(splitter);

      VAD.bind({})({
        source: leftNode,
        voice_stop: () => {
          this.setState({
            left: null,
            activity: [
              ...this.state.activity,
              {
                ch: "l",
                startTime: this.state.left,
                endTime: new Date().getTime()
              }
            ]
          });
        },
        voice_start: () => {
          this.setState({ left: new Date().getTime() });
        }
      });

      VAD.bind({})({
        source: rightNode,
        voice_stop: () => {
          this.setState({
            right: null,
            activity: [
              ...this.state.activity,
              {
                ch: "r",
                startTime: this.state.right,
                endTime: new Date().getTime()
              }
            ]
          });
        },
        voice_start: () => {
          this.setState({ right: new Date().getTime() });
        }
      });
    };

    navigator.mediaDevices
      .getUserMedia({ audio: { echoCancellation: false } }) // モノラル防ぐ
      .then(start)
      .catch(console.error);
  }

  componentWillUnmount() {
    this.state.audioStream.getTracks().forEach(t => t.stop());
  }

  render() {
    return (
      <div>
        <dl>
          <dt>左</dt>
          <dd>{this.state.left && "発話中..."}</dd>
          <dt>右</dt>
          <dd>{this.state.right && "発話中..."}</dd>
        </dl>
        <ul>
          {this.state.activity.map((l, i) => (
            <li key={i}>{JSON.stringify(l)}</li>
          ))}
        </ul>
      </div>
    );
  }
}
