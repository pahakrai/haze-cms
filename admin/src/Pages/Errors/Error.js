/* @flow */

import React from 'react';
// style
import styled from 'styled-components';
// intl
import { injectIntl } from 'react-intl';
// Components
import DocumentTitle from '../../Components/Common/DocumentTitle';

const ContentWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const Content = styled.div`
  margin-top: -30%;
`;

const Title = styled.div`
  font-size: 90pt;
  font-family: HanWangKaiBold-Gb5;
  font-weight: normal;
  text-align: left;
  color: rgba(0, 0, 0, 1);
`;
const InitialTitleText = styled.span``;
const TitleText = styled.span`
  margin-left: -10px;
`;

const Subtitle = styled.div`
  font-size: 18pt;
  font-family: HanWangKaiBold-Gb5;
  font-weight: normal;
  color: #333;
`;

const HomeButton = styled.button`
  padding: 4px 10px;
  border-radius: 5px;
  font-size: 10pt;
  font-family: HanWangKaiBold-Gb5;
  font-weight: normal;
  color: #333;
  margin-top: 24pt;
`;
const SecondaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const ErrorImg = styled.img`
  margin-top: -10px;
`;

const Error = props => {
  const params =
    props.location &&
    props.location.search &&
    new URLSearchParams(props.location.search);
  const message = (params && params.get('message')) || props.message;

  return (
    <DocumentTitle title={'Page Not Found'}>
      <ContentWrapper>
        <Content>
          <Title>
            <InitialTitleText>O</InitialTitleText>
            <TitleText>ops!</TitleText>
          </Title>
          <SecondaryContainer>
            <div style={{ textAlign: 'left' }}>
              <Subtitle>{message}</Subtitle>
              {/* {message && <ContentBox>{message}</ContentBox>} */}
              <HomeButton onClick={() => (window.location = props.jumpUrl)}>
                {props.intl.formatMessage(
                  { id: 'back_to' },
                  { name: props.intl.formatMessage({ id: 'home' }) }
                )}
              </HomeButton>
            </div>
            <ErrorImg src="/images/error_img.png" width="280px" />
          </SecondaryContainer>
        </Content>
      </ContentWrapper>
    </DocumentTitle>
  );
};

Error.defaultProps = {
  location: {},
  jumpUrl: '/'
};

export default injectIntl(({ intl, ...props }) => (
  <Error
    intl={intl}
    title={intl.formatMessage({ id: 'error.title' })}
    message={intl.formatMessage({ id: 'error.content.noExist' })}
    {...props}
  />
));
