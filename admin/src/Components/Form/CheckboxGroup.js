import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import Checkbox from '../Common/Checkbox';

const CheckoutContainer = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  cursor: pointer;
`;

// const Checkbox = styled("input")`
//   zoom: 180%;
// `;

export default class CheckboxGroup extends PureComponent {
  field = ({ input, meta, oldValues, options, disabled }) => {
    const { name, onChange } = input;
    const { touched, error } = meta;
    const inputValue = input.value;

    const checkboxes = options.map(({ label, value }, index) => {
      const handleChange = event => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(value);
        } else {
          arr.splice(arr.indexOf(value), 1);
        }
        return onChange(arr);
      };
      const checked = inputValue
        ? inputValue.includes(value)
        : oldValues.includes(value);
      return (
        <CheckoutContainer key={`checkbox-${index}`}>
          <span>{label}</span>
          <Checkbox
            type="checkbox"
            disabled={disabled}
            name={`${name}[${index}]`}
            value={value}
            checked={checked}
            onChange={handleChange}
          />
        </CheckoutContainer>
      );
    });

    return (
      <div>
        <div>{checkboxes}</div>
        {touched && error && <p className="error">{error}</p>}
      </div>
    );
  };

  render() {
    return <Field {...this.props} type="checkbox" component={this.field} />;
  }
}
