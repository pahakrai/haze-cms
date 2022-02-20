import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Label from '../../Common/Label';
import Card from '../../Common/Card';

const LabelField = styled(Label.Field)`
  height: 30px;
`;
export const Wrapper = styled.div`
  width: 100%;
  padding: 20px 5px;
  border: 1px solid #ddd;
  display: table;
  table-layout: fixed;
  margin-bottom: -1px;
  @media (max-width: 1000px) {
    display: none;
  }
`;

export const CardWrapper = styled(Card)`
  cursor: pointer;
  @media (min-width: 1000px) {
    display: none;
  }
`;

export const Item = styled.div`
  font-size: ${props => props.theme.fonts.size.h5};
  text-align: center;
  display: table-cell;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  display: table-cell;
  cursor: pointer;
`;

export const HiddenItem = styled(Item)`
  @media (max-width: ${props => props.theme.flexa.breakpoints.md}rem) {
    display: none;
  }
`;

export const ActionsItem = styled(Item)`
  min-width: 94px;
`;

const LinkStyles = {
  width: '100%',
  display: 'table',
  tableLayout: 'fixed',
  marginBottom: '-1px',
  color: 'rgba(0, 0, 0, 0.65)'
};

export class WorkspaceAppCardItem extends React.PureComponent {
  render() {
    const { item = {}, intl } = this.props;
    if (!item) {
      return null;
    }

    return (
      <React.Fragment>
        <Wrapper>
          <Link
            style={{ ...LinkStyles }}
            to={`/workspace-app/${item._id}`}
            target="_blank"
          >
            <Item>{item.name}</Item>
            <Item>
              {item.productionIOS && item.productionIOS.latestVersionNo
                ? item.productionIOS.latestVersionNo
                : ''}
            </Item>
            <Item>
              {item.productionIOS && item.productionIOS.releaseDate
                ? moment(item.productionIOS.releaseDate).format('YYYY-MM-DD')
                : ''}
            </Item>
            <Item>
              {item.productionAndroid && item.productionAndroid.latestVersionNo
                ? item.productionAndroid.latestVersionNo
                : ''}
            </Item>
            <Item>
              {item.productionAndroid && item.productionAndroid.releaseDate
                ? moment(item.productionAndroid.releaseDate).format(
                    'YYYY-MM-DD'
                  )
                : ''}
            </Item>
          </Link>
        </Wrapper>

        <CardWrapper>
          <Label>
            <Link
              style={{ ...LinkStyles }}
              to={`/workspace-app/${item._id}`}
              target="_blank"
            >
              <Item>
                {intl.formatMessage({ id: 'display_workspace_app_name' })}
              </Item>
              <Item>{item.name}</Item>

              <Item>
                {intl.formatMessage({
                  id: 'display_workspace_app_ios_latestVersionNo'
                })}
              </Item>
              <Item>
                {item.productionIOS && item.productionIOS.latestVersionNo
                  ? item.productionIOS.latestVersionNo
                  : ''}
              </Item>
              <Item>
                {intl.formatMessage({
                  id: 'display_workspace_app_ios_releaseDate'
                })}
              </Item>
              <Item>
                {item.productionIOS && item.productionIOS.releaseDate
                  ? moment(item.productionIOS.releaseDate).format('YYYY-MM-DD')
                  : ''}
              </Item>

              <Item>
                {intl.formatMessage({
                  id: 'display_workspace_app_ios_latestVersionNo'
                })}
              </Item>
              <Item>
                {item.productionAndroid &&
                item.productionAndroid.latestVersionNo
                  ? item.productionAndroid.latestVersionNo
                  : ''}
              </Item>
              <Item>
                {intl.formatMessage({
                  id: 'display_workspace_app_ios_releaseDate'
                })}
              </Item>
              <Item>
                {item.productionAndroid && item.productionAndroid.releaseDate
                  ? moment(item.productionAndroid.releaseDate).format(
                      'YYYY-MM-DD'
                    )
                  : ''}
              </Item>
            </Link>
          </Label>
          <LabelField rows={1}>{item.name}</LabelField>
        </CardWrapper>
      </React.Fragment>
    );
  }
}

export default WorkspaceAppCardItem;
