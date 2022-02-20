import React from 'react';
import { Select, Button } from 'antd';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';
import { EditOutlined } from '@ant-design/icons';

import { ErrorMessage } from '../../../../Form/Errors';
import FieldContainer from '../../../../Form/FieldContainer';
import FieldLabel from '../../../../Form/FieldLabel';

const Option = Select.Option;
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const generateOption = function (selects) {
  const children = [];
  for (const select of selects) {
    select && children.push(<Option key={select}>{select}</Option>);
  }
  return children;
};

class MultiLanguageTags extends React.PureComponent {
  static defaultProps = {
    valueControl: { get: v => v, set: v => v }
  };
  constructor(props) {
    super(props);

    this.state = { modalOpen: false };
  }

  valueFormat = () => {
    const {
      input: { value: items },
      intl,
      valueControl
    } = this.props;
    return Array.isArray(items)
      ? [...items]
          .filter(v => valueControl.get(v) && valueControl.get(v)[intl.locale])
          .map(v => valueControl.get(v)[intl.locale])
      : [];
  };
  _onSelect = value => {
    const {
      input: { onChange, value: items },
      intl,
      valueControl
    } = this.props;

    onChange([...items, valueControl.set({ [intl.locale]: value })]);
  };
  _onDeselect = value => {
    const {
      input: { onChange, value: items },
      intl,
      valueControl
    } = this.props;

    onChange(
      items.filter(v => {
        const _v = valueControl.get(v);
        return _v && _v[intl.locale] !== value;
      })
    );
  };

  componentDidCatch(e) {}
  render() {
    const {
      label,
      input,
      valueControl,
      meta: { touched, error, warning },
      modal: Modal,
      placeholder
    } = this.props;
    const { _onSelect, _onDeselect } = this;
    const value = this.valueFormat();
    const children = generateOption(value);
    return (
      <React.Fragment>
        <FieldContainer>
          {label && <FieldLabel>{label}</FieldLabel>}
          <div>
            <SelectWrapper>
              <Select
                mode="tags"
                size={'default'}
                value={value}
                placeholder={placeholder}
                onSelect={_onSelect}
                onDeselect={_onDeselect}
                style={{ width: '100%' }}
              >
                {children}
              </Select>
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                size="small"
                style={{ marginLeft: 10 }}
                onClick={() => this.setState({ modalOpen: true })}
              />
            </SelectWrapper>
            {touched &&
              ((error && <ErrorMessage>{error}</ErrorMessage>) ||
                (warning && <ErrorMessage>{warning}</ErrorMessage>))}
          </div>
        </FieldContainer>
        <Modal
          input={input}
          modalOpen={this.state.modalOpen}
          valueControl={valueControl}
          onModalClose={() => this.setState({ modalOpen: false })}
        />
      </React.Fragment>
    );
  }
}

export default injectIntl(props => {
  return <Field {...props} component={MultiLanguageTags} />;
});
