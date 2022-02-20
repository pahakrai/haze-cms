import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';

import Title from '../../Common/Title';
import Card from '../../Common/Card';
import Button from '../../Common/Button';

const TitleItem = styled.div`
  font-size: 16px;
  margin-top: 10px;
  margin-right: 15px;
  display: inline-block;
`;
const ContentItem = styled.span`
  font-size: 16px;
  margin-top: 10px;
  padding: 5px 5px 5px 0;
`;

const HistoryWrapper = styled.div`
  display: flex;
  line-height: 50px;
  border-bottom: 1px solid #d4d4d4;
`;
const HistoryItem = styled.div`
  min-width: 100px;
  font-size: 16px;
`;

const WorkspaceAppForm = ({ intl, workspaceApp, releaseNewVersion, theme }) => {
  return (
    <div>
      <Title.Wrapper>
        <Title>{intl.formatMessage({ id: 'nav.workspace_app' })}</Title>
      </Title.Wrapper>
      <Card style={{ marginTop: 0 }}>
        <div style={{ fontSize: 24, marginBottom: 20 }}>
          {workspaceApp.name}
        </div>

        <div>
          <TitleItem
            style={{ paddingTop: 20, paddingBottom: 10, minWidth: 60 }}
          >
            IOS
          </TitleItem>
          {workspaceApp.productionIOS && (
            <Button
              style={{
                backgroundColor: theme.color.primary,
                color: '#fff',
                marginLeft: 145
              }}
              type="button"
              onClick={() => {
                window.localStorage.setItem('workspaceAppType', 'ios');
                window.location = `/workspace-app/${workspaceApp._id}/app-info`;
              }}
            >
              {intl.formatMessage({
                id: 'nav.edit'
              })}
            </Button>
          )}
        </div>
        {!workspaceApp.productionIOS && (
          <ContentItem>
            <Button
              style={{
                backgroundColor: theme.color.primary,
                color: '#fff'
              }}
              type="button"
              onClick={() => {
                window.localStorage.setItem('workspaceAppType', 'ios');
                window.location = `/workspace-app/${workspaceApp._id}/create-new-version`;
              }}
            >
              {intl.formatMessage({
                id: 'display_workspace_app_create_new_version'
              })}
            </Button>
          </ContentItem>
        )}

        {workspaceApp.productionIOS && (
          <div>
            <ContentItem style={{ display: 'inline-block', minWidth: 65 }}>
              {workspaceApp.productionIOS.latestVersionNo}
            </ContentItem>
            <ContentItem style={{ width: 150, display: 'inline-block' }}>
              {moment(workspaceApp.productionIOS.releaseDate).format(
                'YYYY-MM-DD'
              )}
            </ContentItem>
            {!workspaceApp.productionIOS.nextVersionNo && (
              <ContentItem>
                <Button
                  style={{
                    backgroundColor: theme.color.primary,
                    color: '#fff'
                  }}
                  type="button"
                  onClick={() => {
                    window.localStorage.setItem('workspaceAppType', 'ios');
                    window.location = `/workspace-app/${workspaceApp._id}/create-new-version`;
                  }}
                >
                  {intl.formatMessage({
                    id: 'display_workspace_app_create_new_version'
                  })}
                </Button>
              </ContentItem>
            )}
            {workspaceApp.productionIOS.nextVersionNo && (
              <div>
                <ContentItem style={{ display: 'inline-block', minWidth: 65 }}>
                  {workspaceApp.productionIOS.nextVersionNo}
                </ContentItem>
                <ContentItem style={{ width: 150, display: 'inline-block' }}>
                  {intl.formatMessage({
                    id: 'display_workspace_app_pending_release'
                  })}
                </ContentItem>
                <ContentItem>
                  <Button
                    style={{
                      backgroundColor: theme.color.primary,
                      color: '#fff'
                    }}
                    type="button"
                    onClick={() => releaseNewVersion(workspaceApp._id, 'ios')}
                  >
                    {intl.formatMessage({
                      id: 'display_workspace_app_release_new_version'
                    })}
                  </Button>
                </ContentItem>
              </div>
            )}
          </div>
        )}
        {workspaceApp &&
          workspaceApp.productionIOS &&
          workspaceApp.productionIOS.history && (
            <div>
              <TitleItem style={{ paddingTop: 10 }}>
                {intl.formatMessage({ id: 'display_workspace_app_history' })}
              </TitleItem>
              <HistoryWrapper>
                <HistoryItem>
                  {intl.formatMessage({
                    id: 'display_workspace_app_version'
                  })}
                </HistoryItem>
                <HistoryItem>
                  {intl.formatMessage({
                    id: 'display_workspace_app_released'
                  })}
                </HistoryItem>
                <HistoryItem>
                  {intl.formatMessage({
                    id: 'display_workspace_app_description'
                  })}
                </HistoryItem>
              </HistoryWrapper>
              {cloneDeep(workspaceApp.productionIOS.history).length ? (
                <>
                  {workspaceApp.productionIOS.history.map((v, i) => (
                    <HistoryWrapper key={i}>
                      <HistoryItem>{v.version}</HistoryItem>
                      <HistoryItem>
                        {moment(v.releaseDate).format('YYYY-MM-DD')}
                      </HistoryItem>
                      <HistoryItem>{v.description}</HistoryItem>
                    </HistoryWrapper>
                  ))}
                </>
              ) : (
                <HistoryWrapper style={{ borderBottom: 0 }}>
                  <HistoryItem>
                    {intl.formatMessage({
                      id: 'display_workspace_app_history_not_data'
                    })}
                  </HistoryItem>
                </HistoryWrapper>
              )}
            </div>
          )}

        <div>
          <TitleItem
            style={{ paddingTop: 20, paddingBottom: 10, minWidth: 60 }}
          >
            Android
          </TitleItem>
          {workspaceApp.productionAndroid && (
            <Button
              style={{
                backgroundColor: theme.color.primary,
                color: '#fff',
                marginLeft: 145
              }}
              type="button"
              onClick={() => {
                window.localStorage.setItem('workspaceAppType', 'android');
                window.location = `/workspace-app/${workspaceApp._id}/app-info`;
              }}
            >
              {intl.formatMessage({
                id: 'nav.edit'
              })}
            </Button>
          )}
        </div>
        {!workspaceApp.productionAndroid && (
          <ContentItem>
            <Button
              style={{
                backgroundColor: theme.color.primary,
                color: '#fff'
              }}
              type="button"
              onClick={() => {
                window.localStorage.setItem('workspaceAppType', 'android');
                window.location = `/workspace-app/${workspaceApp._id}/create-new-version`;
              }}
            >
              {intl.formatMessage({
                id: 'display_workspace_app_create_new_version'
              })}
            </Button>
          </ContentItem>
        )}
        {workspaceApp.productionAndroid && (
          <div>
            <ContentItem style={{ display: 'inline-block', minWidth: 65 }}>
              {workspaceApp.productionAndroid.latestVersionNo}
            </ContentItem>
            <ContentItem style={{ width: 150, display: 'inline-block' }}>
              {moment(workspaceApp.productionAndroid.releaseDate).format(
                'YYYY-MM-DD'
              )}
            </ContentItem>
            {!workspaceApp.productionAndroid.nextVersionNo && (
              <ContentItem>
                <Button
                  style={{
                    backgroundColor: theme.color.primary,
                    color: '#fff'
                  }}
                  type="button"
                  onClick={() => {
                    window.localStorage.setItem('workspaceAppType', 'android');
                    window.location = `/workspace-app/${workspaceApp._id}/create-new-version`;
                  }}
                >
                  {intl.formatMessage({
                    id: 'display_workspace_app_create_new_version'
                  })}
                </Button>
              </ContentItem>
            )}
            {workspaceApp.productionAndroid.nextVersionNo && (
              <div>
                <ContentItem style={{ display: 'inline-block', minWidth: 65 }}>
                  {workspaceApp.productionAndroid.nextVersionNo}
                </ContentItem>
                <ContentItem style={{ width: 150, display: 'inline-block' }}>
                  {intl.formatMessage({
                    id: 'display_workspace_app_pending_release'
                  })}
                </ContentItem>
                <ContentItem>
                  <Button
                    style={{
                      backgroundColor: theme.color.primary,
                      color: '#fff'
                    }}
                    type="button"
                    onClick={() =>
                      releaseNewVersion(workspaceApp._id, 'android')
                    }
                  >
                    {intl.formatMessage({
                      id: 'display_workspace_app_release_new_version'
                    })}
                  </Button>
                </ContentItem>
              </div>
            )}
          </div>
        )}

        {workspaceApp &&
          workspaceApp.productionAndroid &&
          workspaceApp.productionAndroid.history && (
            <div>
              <TitleItem style={{ paddingTop: 10 }}>
                {intl.formatMessage({ id: 'display_workspace_app_history' })}
              </TitleItem>
              <HistoryWrapper>
                <HistoryItem>
                  {intl.formatMessage({
                    id: 'display_workspace_app_version'
                  })}
                </HistoryItem>
                <HistoryItem>
                  {intl.formatMessage({
                    id: 'display_workspace_app_released'
                  })}
                </HistoryItem>
                <HistoryItem>
                  {intl.formatMessage({
                    id: 'display_workspace_app_description'
                  })}
                </HistoryItem>
              </HistoryWrapper>

              {cloneDeep(workspaceApp.productionAndroid.history).length ? (
                <>
                  {workspaceApp.productionAndroid.history.map((v, i) => (
                    <HistoryWrapper key={i}>
                      <HistoryItem>{v.version}</HistoryItem>
                      <HistoryItem>
                        {moment(v.releaseDate).format('YYYY-MM-DD')}
                      </HistoryItem>
                      <HistoryItem>{v.description}</HistoryItem>
                    </HistoryWrapper>
                  ))}
                </>
              ) : (
                <HistoryWrapper style={{ borderBottom: 0 }}>
                  <HistoryItem>
                    {intl.formatMessage({
                      id: 'display_workspace_app_history_not_data'
                    })}
                  </HistoryItem>
                </HistoryWrapper>
              )}
            </div>
          )}
      </Card>
    </div>
  );
};

export default WorkspaceAppForm;
