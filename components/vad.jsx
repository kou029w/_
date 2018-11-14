import { Component } from "react";
import * as _VAD from "vad.js/lib/vad.js";

export default class extends Component {
  state = {
    audioContext: new AudioContext(),
    audioStream: null,
    left: null,
    right: null
  };

  componentDidMount() {
    const setState = this.setState.bind(this);
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
      setState({ audioStream: stream });
      audioContext.createMediaStreamSource(stream).connect(splitter);

      VAD.bind({})({
        source: leftNode,
        voice_stop() {
          setState({ left: null });
        },
        voice_start() {
          setState({ left: "喋り始めました" });
        }
      });

      VAD.bind({})({
        source: rightNode,
        voice_stop() {
          setState({ right: null });
        },
        voice_start() {
          setState({ right: "喋り始めました" });
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
      <dl>
        <dt>左</dt>
        <dd>{this.state.left}</dd>
        <dt>右</dt>
        <dd>{this.state.right}</dd>
      </dl>
    );
  }
}
