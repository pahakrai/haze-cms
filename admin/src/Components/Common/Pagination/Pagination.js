import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LeftOutlined, RigthOutlined } from '@ant-design/icons';

import JumpPage from './JumpPage';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Card = styled.div`
  cursor: pointer;
  width: ${props => props.size * 2}px;
  height: ${props => props.size * 2}px;
  border-radius: 4px;
  font-size: 15px;
  text-align: center;
  line-height: 37px;
  margin: 0 4px;
  background-color: ${props =>
    props.disabled
      ? '#eee'
      : props.active
      ? props.theme.color.primary
      : '#fff'};
  color: ${props => (props.active ? '#fff' : '#333')};
  border: 1px solid rgba(151, 151, 151, 1);
`;
const Button = styled(Card)``;
class Pagination extends PureComponent {
  static propTypes = {
    total: PropTypes.number,
    currentPage: PropTypes.number,
    displayItem: PropTypes.number,
    size: PropTypes.number,
    style: PropTypes.object,
    onChange: PropTypes.func
  };
  static defaultProps = {
    total: 10,
    currentPage: 1,
    displayItem: 5,
    size: 20,
    style: {}
  };
  constructor(props) {
    super(props);

    // Whether it is a controlled component
    const controlled = props.page !== undefined;
    this.state = {
      page: controlled ? props.page : 1,
      controlled
    };
  }

  handlePropChange = page => {
    const { onChange } = this.props;
    onChange && onChange(page || this.state.page);
  };

  handleChangePage(page) {
    const { controlled } = this.state;

    if (!controlled) {
      this.setState({ page }, this.handlePropChange);
    } else {
      this.handlePropChange(page);
    }
  }
  prevPage = () => {
    const { controlled } = this.state;
    const { page: propPage } = this.props;

    if (!controlled) {
      this.setState(prevState => {
        const page = prevState.page - 1;

        return {
          page
        };
      }, this.handlePropChange);
    } else {
      this.handlePropChange(propPage - 1);
    }
  };
  nextPage = () => {
    const { controlled } = this.state;
    const { page: propPage } = this.props;

    if (!controlled) {
      this.setState(prevState => {
        const page = prevState.page + 1;

        return {
          page
        };
      }, this.handlePropChange);
    } else {
      this.handlePropChange(propPage + 1);
    }
  };

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    const { page: prevPage } = prevProps;
    const { controlled } = this.state;

    if (controlled && page !== undefined && page !== prevPage) {
      this.setState({
        page: page
      });
    }
  }
  render() {
    const { size, style, paginationContainerStyle, displayItem } = this.props;
    let { total } = this.props;
    total = total || 1;
    const { page: currentPage } = this.state;
    const disabledPrev = currentPage === 1;
    const disabledNext = currentPage === total;

    return (
      <Container style={style}>
        <PaginationContainer style={paginationContainerStyle}>
          <Button
            onClick={disabledPrev ? undefined : this.prevPage}
            disabled={disabledPrev}
            // style={{ marginRight: 12 }}
            size={size}
          >
            <LeftOutlined />
          </Button>
          {Array(displayItem > total ? total : displayItem)
            .fill('')
            .map((v, i) => {
              let page = i + 1;
              if (currentPage < displayItem / 2) {
              } else if (currentPage > total - displayItem / 2) {
                page = total - displayItem + page;
              } else {
                page = Math.floor(currentPage - displayItem / 2 + page);
              }
              return (
                <Card
                  key={i}
                  active={currentPage === page}
                  size={size}
                  onClick={() => this.handleChangePage(page)}
                >
                  {page}
                </Card>
              );
            })}
          <Button
            onClick={disabledNext ? undefined : this.nextPage}
            disabled={disabledNext}
            // style={{ marginLeft: 12 }}
            size={size}
          >
            <RigthOutlined />
          </Button>
        </PaginationContainer>
        <JumpPage
          style={{ marginLeft: 20 }}
          onConfirm={pageValue => {
            const numberValue = Number(pageValue);
            if (
              /^[1-9][0-9]*$/.test(pageValue) &&
              numberValue <= total &&
              numberValue > 0
            ) {
              this.handleChangePage(numberValue);
            }
          }}
        />
      </Container>
    );
  }
}

export default Pagination;
