import React from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export default class Display extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: props.widget.data.open
    };
    // this.togglePanel = this.togglePanel.bind(this);
  }

  togglePanel() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const {
      widget: {
        data: { iconBgColor }
      },
      locale
    } = this.props;

    const { open } = this.state;

    const problemDisplay = this.props.widget.data.problem[locale] || '';
    const replyDisplay = this.props.widget.data.reply[locale] || '';

    return (
      <div>
        <div
          onClick={e => this.togglePanel()}
          className="widget_folding_card_nav"
        >
          <div
            className="widget_folding_card_subscript"
            style={{
              backgroundColor: iconBgColor
            }}
          >
            {open && <IoIosArrowUp />}
            {!open && <IoIosArrowDown />}
          </div>

          <div className="widget_folding_card_title"> {problemDisplay} </div>
        </div>
        {open && (
          <div className="widget_folding_card_content">
            <div
              className="widget_text_editor_style"
              dangerouslySetInnerHTML={{
                __html: replyDisplay
              }}
            />
          </div>
        )}
      </div>
    );
  }
}
