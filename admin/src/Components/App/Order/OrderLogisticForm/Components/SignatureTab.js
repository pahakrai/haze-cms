import React from 'react';
import styled from 'styled-components';

import { withFormValues } from '../../../../Form/utils';
import FileMetaImage from '../../../../../Containers/FileMetaImage/FileMetaImage';

const SignatureTabCompoennt = ({ signature }) => {
  return (
    <Container>
      {!!signature && (
        <FileMetaImage
          fileMetaId={signature}
          style={{ height: 100, maxWidth: '100%' }}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const SignatureTab = withFormValues({
  fields: [['signature', 'signature']]
})(SignatureTabCompoennt);

export default SignatureTab;
