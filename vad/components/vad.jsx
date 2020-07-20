import { Component } from "react";
import * as _VAD from "vad.js/lib/vad.js";
import Percentage from "./percentage";
import Kaburi from "./kaburi";

export default class extends Component {
  state = {
    audioContext: new AudioContext(),
    audioStream: null,
    left: null,
    right: null,
    activity: [],
    kaburiActivity: []
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

    const putKaburi = () => {
      if (this.state.left !== null && this.state.right !== null) {
        this.setState({
          kaburiActivity: [
            ...this.state.kaburiActivity,
            {
              startTime: Math.max(this.state.left, this.state.right),
              endTime: new Date().getTime()
            }
          ]
        });
      }
    };

    const start = stream => {
      this.setState({ audioStream: stream });
      audioContext.createMediaStreamSource(stream).connect(splitter);

      VAD.bind({})({
        source: leftNode,
        voice_stop: () => {
          putKaburi();

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
          putKaburi();

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
        <Percentage activity={this.state.activity} />
        <Kaburi activity={this.state.kaburiActivity} />
      </div>
    );
  }
}
