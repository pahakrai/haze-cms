import React, { PureComponent } from 'react'
import Select from 'react-select'
// import styled from 'styled-components';
import { Row, Col } from 'react-flexa'
import FieldContainer from '../../Form/FieldContainer'
import FieldLabel from '../../Form/FieldLabel'
// import { MdFileDownload } from 'react-icons/md';

// const FileDownloadButton = styled(MdFileDownload)`
//   cursor: pointer;
// `;

const EmailSelectOptions = [
  {
    label: 'Template',
    value:
      'https://s3-ap-southeast-1.amazonaws.com/devcdn.golpasal.com/assets/images/buyco/Template-59c18989767143d5274a38f9a81b91a6.html'
  }
]

export default class EmailTemplate extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      option: null
    }
  }

  _onSelectChange = (option) => {
    // option.value
    this.setState({ option }, () => {
      window.open(option.value, 'Download')
    })
  }

  render() {
    // const { label, btText, placeholder, disabled } = this.props;
    const { label, placeholder, disabled } = this.props
    return (
      <FieldContainer>
        <FieldLabel>{label}</FieldLabel>

        <Row>
          <Col md={12} sm={12}>
            <Select
              placeholder={placeholder || label}
              options={EmailSelectOptions}
              isDisabled={disabled}
              onChange={this._onSelectChange}
              value={this.state.option}
            />
          </Col>
          {/* <Col md={12} sm={12}>
            <FileDownloadButton disabled={disabled} onClick={() => {}}>
              {btText}
            </FileDownloadButton>
          </Col> */}
        </Row>
      </FieldContainer>
    )
  }
}
