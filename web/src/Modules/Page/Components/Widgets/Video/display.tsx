import React from "react";
import ReactPlayer from "react-player";

export default class Display extends React.Component<
  {
    widget: any;
    locale: string;
    style?: any;
    isPlaying?: boolean;
  },
  { isPlaying: boolean; isEnd: boolean }
> {
  constructor(props) {
    super(props);
    this.state = {
      isEnd: false,
      isPlaying: props.isPlaying === undefined ? true : props.isPlaying
    };
  }

  onToggleState = () => {
    this.setState({ isPlaying: !this.state.isPlaying });
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
      <div style={style}>
        {!this.state.isEnd && (
          <ReactPlayer
            url={src}
            playing={isPlaying}
            width={width}
            height={height}
            controls
            muted
            className="widget_video_style"
            style={{
              marginTop: "-10vw"
            }}
            config={{
              file: {
                attributes: {
                  autoPlay: true,
                  muted: true
                }
              }
            }}
            onEnded={() => this.setState({ isEnd: true })}
          />
        )}

        {this.state.isEnd && (
          <div
            style={{
              backgroundPosition: "50% 50%",
              backgroundSize: "cover",
              backgroundRepeat: "",
              backgroundImage:
                "url(https://devcdn.golpasal.com/assets/images/ecomm/5fd83be73db74d57b304cb82/seed/banner.jpg)",
              width: "100%",
              height: "30vw",
              overflow: "hidden",
              pointerEvents: "none"
            }}
          ></div>
        )}
      </div>
    );
  }
}
