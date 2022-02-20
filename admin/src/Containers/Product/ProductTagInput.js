import React, { useEffect, useState } from 'react';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { bindActionCreators } from 'redux';
import CreatableSelect from 'react-select/creatable';

import { ErrorMessage } from '../../Components/Form/Errors';
import FieldContainer from '../../Components/Form/FieldContainer';
import { FieldLabel } from '../../Components/Form/form.styled';
import { selectStyles } from '../../Components/Form/Dropdown';

import { TagActions } from '../../Redux/Tag/actions';
import { getTags } from '../../Redux/selectors';

const ProductTagInput = ({
  productId,
  input: { value, onChange },
  meta: { error, warning, touched },
  getTagsByProductId,
  tagsByProductId,
  tags: _tags,
  label,
  intl,
  fetchTags,
  disabled
}) => {
  const [newOptions, setNewOptions] = useState([]);
  useEffect(() => {
    getTagsByProductId(productId);
    fetchTags();
  }, [fetchTags, getTagsByProductId, productId]);
  const tags =
    _tags && _tags.length
      ? [..._tags].map(tag => ({
          label: tag.text,
          value: tag.text
        }))
      : [];
  const handleChange = (valueArray, actionMeta) => {
    const newValues = valueArray || [];
    const formatVal = [];
    setNewOptions(newValues.filter(v => v.__isNew__));

    newValues.forEach(v => {
      formatVal.push(v.value);
    });
    onChange(formatVal);
  };
  const options = [...tags, ...newOptions];
  const _value =
    value ||
    (tagsByProductId && tagsByProductId.length
      ? tagsByProductId.map(v => v && v.text)
      : []);
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <div>
        <CreatableSelect
          isDisabled={disabled}
          isMulti
          value={
            _value && _value.length
              ? options.filter(v => _value.find(_v => _v === v.value))
              : []
          }
          onChange={handleChange}
          options={options}
          placeholder={intl.formatMessage({ id: 'display_select' })}
          styles={selectStyles({ disabled })}
        />
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </div>
    </FieldContainer>
  );
};

const mapStateToProps = (state, { productId }) => {
  return {
    tagsByProductId: getTags(state, state.tag.resultsByProductId),
    tags: state.tag.allDistinctResults
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getTagsByProductId: TagActions.getTagsByProductId,
      fetchTags: TagActions.getAllDistinctTags
    },

    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(props => <Field component={ProductTagInput} {...props} />));
