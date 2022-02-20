import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import { IntlActions } from '../Redux/Intl/actions';
import Button from '../Components/Common/Button';
import ButtonGroup from '../Components/Common/ButtonGroup';

import Locales, { locales as AppSupportLanguages } from '../Locales';

const FloatRightContainer = styled.div`
  right: 0;
  float: right;
`;

class LocaleSwitcherContainer extends React.PureComponent {
  render() {
    const { updateIntl, locale } = this.props;

    const onItemClick = locale => {
      updateIntl(locale);
    };

    return (
      <FloatRightContainer>
        {/* <h5>{intl.formatMessage({ id: 'languageSwitcher.label' })}</h5> */}
        <ButtonGroup>
          {AppSupportLanguages.map(v => (
            <Button.Lang
              key={v}
              active={locale === v}
              onClick={item => onItemClick(v)}
            >
              {Locales[v.replace('-', '_')].__name__}
            </Button.Lang>
          ))}
        </ButtonGroup>
      </FloatRightContainer>
    );
  }
}

const mapStateToProps = state => ({ locale: state.intl.locale });
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateIntl: IntlActions.updateIntl
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LocaleSwitcherContainer));
