import React from 'react';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Utils
import styled from 'styled-components';
import * as moment from 'moment';
// antd
import { Collapse, Card } from 'antd';
// Components
import Modal from '../../../Components/Modal';
import SiderLayout from '../../../Components/Common/SiderLayout';
// User Containers
import PostListContainer from '../../../Containers/Post/PostList';
import PostSearch from '../../../Containers/Post/PostSearch';
import PostFilter from '../../../Containers/Post/PostFilter';
// Redux
import { PostActions } from '../../../Redux/Post/actions';
import { getPostById } from '../../../Redux/selectors';

const RowContainer = styled.div``;
const TextContainer = styled.p`
  word-wrap: break-word;
  color: black;
`;

class PostParametersModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hideSearchSider: false,
      searchTerm: null,
      filterValue: null
    };
  }

  // combination
  _getParameters = _id => {
    return { _id };
  };

  _onItemClick = _id => {
    const { closeModal, onChange } = this.props;
    if (onChange) onChange(this._getParameters(_id));
    if (closeModal) closeModal();
  };
  render() {
    const { intl } = this.props;
    return (
      <SiderLayout>
        <React.Fragment>
          <PostSearch
            intl={intl}
            filterValues={this.state.filterValue}
            searchTerm={this.state.searchTerm}
            onChanged={value => {
              this.setState({
                searchTerm: value
              });
            }}
          />
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Collapse.Panel
              header={intl.formatMessage({ id: 'advance_filter' })}
              key="1"
            >
              <PostFilter
                intl={intl}
                onChanged={value => {
                  this.setState({
                    filterValue: value
                  });
                }}
              />
            </Collapse.Panel>
          </Collapse>
        </React.Fragment>
        <React.Fragment>
          <PostListContainer intl={intl} onItemClick={this._onItemClick} />
        </React.Fragment>
      </SiderLayout>
    );
  }
}

PostParametersModal.defaultProps = {
  closeModal: () => {},
  onChange: () => {},
  intl: {}
};

// disabled, placeholder, value = {}, onChange
class PostParameters extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }
  static defaultProps = {
    value: { _id: null },
    // fetch post Item
    fetchPostById: () => ({}),
    // _id get post
    post: {},
    // value callback
    onChange: value => {}
  };

  componentDidMount() {
    const { fetchPostById, post, value } = this.props;
    if (!post || !post._id) value && value._id && fetchPostById(value._id);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value && nextProps.value._id !== prevState.value._id) {
      // update post Item
      if (nextProps.value && nextProps.value._id && nextProps.fetchPostById)
        nextProps.fetchPostById(nextProps.value._id);
      return {
        value: nextProps.value
      };
    }
    if (nextProps.post) return null;
  }

  _isEmptyValue = () => {
    const { value } = this.props;
    return !(value && value._id);
  };

  _renderPostItem = () => {
    const { post: item, intl } = this.props;
    return (
      <Card
        onClick={() => this.modalRef.openModal && this.modalRef.openModal()}
      >
        <RowContainer>
          {intl.formatMessage({ id: 'display_post_title' })}
          <TextContainer>
            {(item.title && item.title[intl.locale]) ||
              (item.title &&
                Object.keys(item.title) &&
                item.title[Object.keys(item.title)[0]])}
          </TextContainer>
        </RowContainer>
        <RowContainer>
          {intl.formatMessage({ id: 'display_post_type' })}
          <TextContainer>{item.type}</TextContainer>
        </RowContainer>
        <RowContainer>
          {intl.formatMessage({ id: 'display_post_snippets' })}
          <TextContainer>
            {(item.snippets && item.snippets[intl.locale]) ||
              (item.snippets &&
                Object.keys(item.snippets) &&
                item.snippets[Object.keys(item.snippets)[0]])}
          </TextContainer>
        </RowContainer>
        <RowContainer>
          {intl.formatMessage({ id: 'display_post_priority' })}
          <TextContainer>{item.priority}</TextContainer>
        </RowContainer>
        <RowContainer>
          {intl.formatMessage({ id: 'display_post_date' })}
          <TextContainer>
            {moment(item.postDate).format('YYYY-MM-DD HH:mm')}
          </TextContainer>
        </RowContainer>
        <RowContainer>
          {intl.formatMessage({
            id: 'display_post_status'
          })}
          <TextContainer>{item.isActive ? 'active' : 'inactive'}</TextContainer>
        </RowContainer>
      </Card>
    );
  };

  render() {
    const { intl } = this.props;
    return (
      <React.Fragment>
        <Modal.Button
          onRef={modalRef => (this.modalRef = modalRef)}
          title={intl.formatMessage({ id: 'post.title' })}
          text={intl.formatMessage({ id: 'display_select' })}
          content={closeModal => (
            <PostParametersModal closeModal={closeModal} {...this.props} />
          )}
        />
        {!this._isEmptyValue() && this._renderPostItem()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // value
  post:
    (ownProps.value &&
      ownProps.value._id &&
      getPostById(state, ownProps.value._id)) ||
    {}
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPostById: PostActions.getPostById
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PostParameters);
