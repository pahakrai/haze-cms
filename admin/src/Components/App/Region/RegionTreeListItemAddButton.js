import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px 13px;
  border: 1px solid #888;
  background-color: #fff;
  width: 270px;
  font-size: 15px;
  line-height: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.span`
  width: 100%;
  text-align: center;
  cursor: pointer;
`;

class RegionTreeListItem extends React.PureComponent {
  render() {
    const { intl, onClick } = this.props;

    return (
      <Container onClick={onClick}>
        <Text>
          {intl.formatMessage({
            id: 'nav.create'
          })}
        </Text>
      </Container>
    );
  }
}

export default RegionTreeListItem;
