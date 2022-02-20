import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Field } from 'redux-form';
import { Card as AntCard } from 'antd';
import { FormattedMessage } from 'react-intl';

import FileMetaImage from '../../Containers/FileMetaImage';

import Loading from '../../Components/Common/Loading';
import FieldContainer from '../../Components/Form/FieldContainer';
import FieldLabel from '../../Components/Form/FieldLabel';

import { PageActions } from '../../Redux/Page/actions';
import { getSelectSearchPages } from '../../Redux/selectors';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.color.background};
`;

const Card = styled(AntCard)`
  margin: 10px 10px 0 0;
  border: 10px solid
    ${props => (props.selected ? props.theme.color.primary : 'transparent')};
  :hover {
    border: 1px solid ${props => props.theme.color.primary};
  }
`;

const NoData = styled.div`
  height: 306px;
  width: 100%;
  text-align: center;
  line-height: 250px;
  font-size: 20px;
`;
const LoadingWraper = styled.div`
  height: 306px;
  width: 100%;
  position: relative;
`;

class PageTemplateListContainer extends React.PureComponent {
  static defaultProps = {
    input: { value: '_id', onChange: value => value }
  };

  componentDidMount() {
    this.fetchPageTemplates();
  }

  fetchPageTemplates() {
    const { fetchPageTemplates } = this.props;
    fetchPageTemplates({
      isTemplate: true,
      isActive: true
    });
  }

  // onItemClick = pageTemplate => {
  //   this.props.history.push(`/pages/create/${pageTemplate._id}`);
  // };

  onItemClick = pageTemplate => {
    const { input } = this.props;
    if (input && input.onChange) input.onChange(pageTemplate._id);
  };

  isSelectedItem = pageTemplate => {
    const { input } = this.props;
    return !!input && input.value === pageTemplate._id;
  };

  getPageTemplates = () => {
    const { pageTemplates } = this.props;
    return Array.isArray(pageTemplates) && pageTemplates.length > 0
      ? pageTemplates
      : null;
  };

  render() {
    const { onItemClick, getPageTemplates, isSelectedItem } = this;
    const { locale, label, loading } = this.props;
    const pageTemplates = getPageTemplates();
    return (
      <FieldContainer>
        <FieldLabel>{label}</FieldLabel>
        <Container>
          {pageTemplates ? (
            pageTemplates.map((page, index) => (
              <Card
                hoverable
                key={page._id}
                style={{
                  marginLeft: index !== 0 ? 10 : 0,
                  boxShadow: isSelectedItem(page)
                    ? '0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)'
                    : ''
                }}
                selected={isSelectedItem(page)}
                onClick={() => onItemClick(page)}
                cover={
                  <FileMetaImage
                    alt={page && page.title && page.title[locale]}
                    style={{ height: 240, width: 200 }}
                    defaultImage={
                      process.env.REACT_APP_DEFAULT_TEMPLATE_PREVIEW_URL
                    }
                    fileMetaId={page.preview}
                  />
                }
              >
                <Card.Meta
                  title={
                    (page && page.title && page.title[locale]) || 'Template'
                  }
                />
              </Card>
            ))
          ) : loading ? (
            <LoadingWraper>
              <Loading isLoading={loading} fill />
            </LoadingWraper>
          ) : (
            <NoData>
              <FormattedMessage id="msg.no_templates" />
            </NoData>
          )}
        </Container>
      </FieldContainer>
    );
  }
}
const mapStateToProps = state => ({
  locale: state.intl.locale,
  loading: state.loading.getPageTemplates,
  pageTemplates: getSelectSearchPages(state)
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPageTemplates: PageActions.getPageTemplates
    },
    dispatch
  );

const PageTemplateListWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTemplateListContainer);

export default PageTemplateListWrapper;

// need input={value,onChange}

export const PageTemplateListField = props => {
  return <Field {...props} component={PageTemplateListWrapper} />;
};
