import React from 'react';
import ReactPlayer from 'react-player';

export default class Display extends React.PureComponent {
  state = {
    isPlaying: false
  };

  onToggleState = () => {
    const newState = !this.state.isPlaying;
    this.setState({ isPlaying: newState }, () => {
      if (!this.player) return;
      if (newState) {
        this.player.play();
      } else {
        this.player.pause();
      }
    });
  };

  onPlay = () => {
    const { isPlaying } = this.state;
    if (!isPlaying) {
      this.setState({ isPlaying: true });
    }
  };

  onPause = () => {
    const { isPlaying } = this.state;
    if (isPlaying) {
      this.setState({ isPlaying: false });
    }
  };

  render() {
    const {
      widget: {
        data: { src, width, height }
      },
      style
    } = this.props;
    const { isPlaying } = this.state;

    return (
      <div
        className="widget_video_style"
        onClick={this.onToggleState}
        style={style}
      >
        <ReactPlayer
          playing={isPlaying}
          url={src}
          onPlay={this.onPlay}
          onPause={this.onPause}
          width={width}
          height={height}
        />
        {/* {isPlaying && (
          <img
            className="play"
            onClick={this.onToggleState}
            alt="video_play"
            src={'/images/video_play.png'}
          />
        )} */}
        {!isPlaying && (
          <img
            onClick={this.onToggleState}
            alt="video_suspend"
            src={'/images/video_suspend.png'}
          />
        )}
      </div>
    );
  }
}
