import React from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';

import Button from '../../Components/Common/Button';

const CreateButton = styled(Button.Primary)`
  margin: 0 0 10px 8px !important;
  display: flex;
  justify-content: center;
  align-items: center;
`;
class ProductCreateButtonContainer extends React.PureComponent {
  goToCreate() {
    const { history } = this.props;
    history.push('/products/create');
  }

  render() {
    const { intl } = this.props;
    return (
      <CreateButton type="button" onClick={this.goToCreate.bind(this)}>
        <AiOutlinePlus /> {intl.formatMessage({ id: 'create_btn' })}
      </CreateButton>
    );
  }
}
export default withRouter(ProductCreateButtonContainer);
