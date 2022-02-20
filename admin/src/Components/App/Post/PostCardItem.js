import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import moment from 'moment';

import FileMetaImage from '../../../Containers/FileMetaImage';
import P from '../../Common/P';

const Text = styled(P)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// image title description
export default ({ post, intl = {}, onClick }) => {
  const locale = (intl && intl.locale) || 'en';
  const image =
    post && post.images && post.images.length ? post.images[0].fileMeta : null;
  const title = post.title && post.title[locale];
  const snippets = post.snippets && post.snippets[locale];
  const createAt =
    post && post.createdAt && moment(post.createdAt).format('YYYY-MM-DD HH:mm');
  const postDate =
    post && post.postDate && moment(post.postDate).format('YYYY-MM-DD');
  const isActive = post
    ? post.isActive
      ? intl.formatMessage({ id: 'display_available' })
      : intl.formatMessage({ id: 'display_unavailable' })
    : '';

  return (
    <Card
      hoverable
      cover={
        <FileMetaImage
          height={200}
          alt="post"
          defaultImage={'images/not_found.png'}
          fileMetaId={image}
          style={{ objectFit: 'cover' }}
        />
      }
      onClick={onClick}
    >
      <Card.Meta
        title={title}
        description={
          <div>
            <Text>{snippets}</Text>
            <Text>
              {intl.formatMessage({ id: 'display_create_at' })}: {createAt}
            </Text>
            <Text>
              {' '}
              {intl.formatMessage({ id: 'date' })}: {postDate}
            </Text>
            <Text>{isActive}</Text>
          </div>
        }
      />
    </Card>
  );
};
