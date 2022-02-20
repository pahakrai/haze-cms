import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import { FormattedMessage } from 'react-intl';
import { normalize } from 'normalizr';
import { entities as Schemas } from '../../Services/Schemas';
// redux
import ResourceActions from '../../Redux/Resources/actions';
import { PageActions } from '../../Redux/Page/actions';
import FieldLabel from '../../Components/Form/FieldLabel';
import P from '../../Components/Common/P';
import Link from '../../Components/Common/Link';
import { ErrorMessage } from '../../Components/Form/Errors';
import FieldContainer from '../../Components/Form/FieldContainer';
// server
import PageService from '../../Services/APIServices/PageService';

class _SelectMultiComponent extends PureComponent {
  static defaultProps = {
    input: {
      value: [],
      onChange: () => true,
      onBlur: () => true
    },
    meta: {},
    findOptionById: _id => false,
    searchOpts: {}
  };
  componentDidMount() {
    const { findOptionById = _id => false } = this.props;
    // init values
    const options = this._getValuesByRes();
    if (!options || !options.length) return;
    options.forEach(option => findOptionById(option.value));
  }
  _onChange = option => {
    const {
      input: { onChange = () => false },
      isMulti
    } = this.props;
    if (onChange)
      onChange(
        isMulti ? option && option.map(item => item.value) : option.value
      );
  };
  _getFetchOpts = () => ({ isSystem: true, ...(this.props.searchOpts || {}) });
  _loadOptions = (inputValue, callback) => {
    const { intl } = this.props;
    const opts = this._getFetchOpts();
    PageService.getPages(
      inputValue ? { searchTerm: inputValue, ...opts } : opts
    )
      .then(res => {
        // status
        if (res.status === 200 && callback) {
          // save redux
          this._saveRedux(res.data);
          // select
          callback(
            res.data &&
              Array.isArray(res.data) &&
              res.data.map(item => ({
                label: item.title[intl.locale] || 'Not title',
                value: item._id
              }))
          );
        }
      })
      .catch(err => console.warn(err));
  };
  _saveRedux = data => {
    const { addResourceEntities } = this.props;
    const { entities } = normalize(data, [Schemas.pageSchema]);
    addResourceEntities && addResourceEntities(entities);
  };
  _getValuesByRes = () => {
    const {
      input: { value },
      resPages,
      isMulti,
      intl
    } = this.props;
    return isMulti
      ? (value || []).map(gid => ({
          label: resPages[gid]
            ? resPages[gid].title[intl.locale] || 'Not title'
            : '',
          value: gid
        }))
      : {
          label: resPages[value]
            ? resPages[value].title[intl.locale] || 'Not title'
            : '',
          value
        };
  };
  render() {
    const {
      label,
      labelStyle,
      disabled,
      meta: { touched, error, warning },
      isMulti = true,
      tips,
      toRedirect = defaultLink => defaultLink
    } = this.props;
    const optionValues = this._getValuesByRes();
    return (
      <FieldContainer>
        <FieldLabel style={labelStyle}>{label}</FieldLabel>
        <AsyncSelect
          id="react-async-select"
          isMulti={isMulti}
          cacheOptions
          value={optionValues}
          onChange={this._onChange}
          placeholder={<FormattedMessage id="display_select" />}
          isDisabled={disabled}
          defaultOptions={true}
          loadOptions={this._loadOptions}
        />
        {tips && (
          <P style={{ marginTop: 5 }}>
            {tips}
            {(Array.isArray(optionValues)
              ? optionValues[0].value
              : optionValues.value) && (
              <Link
                style={{ marginLeft: 10 }}
                to={toRedirect(
                  `/pages/${
                    Array.isArray(optionValues)
                      ? optionValues[0].value
                      : optionValues.value
                  }/content`
                )}
              >
                <FormattedMessage id="nav.edit" />
              </Link>
            )}
          </P>
        )}
        {touched &&
          ((error && <ErrorMessage>{error}</ErrorMessage>) ||
            (warning && <ErrorMessage>{warning}</ErrorMessage>))}
      </FieldContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    resPages: state.resources.page
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      findOptionById: PageActions.getPageById,
      addResourceEntities: ResourceActions.addEntities
    },
    dispatch
  );

export const SelectMultiComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SelectMultiComponent);

export default props => {
  return <Field {...props} component={SelectMultiComponent} />;
};
