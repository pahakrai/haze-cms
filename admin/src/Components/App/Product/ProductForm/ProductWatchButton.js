import React, { useState, useCallback, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';

import { formatUserName } from '../../../../Lib/util';

import ProductService from '../../../../Services/APIServices/ProductService';

import UserAvatar from '../../../../Containers/User/UserAvatar';

import Modal from '../../../Modal';
import Button from '../../../Common/Button';
import FieldContainer from '../../../Form/FieldContainer';

const UserListContainer = styled.div`
  width: 100%;
`;
const UserItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  margin-bottom: 15px;
`;
const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

const ProductWatchButton = ({
  modalTitle,
  children,
  intl,
  query,
  productId
}) => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const _users = [];
      try {
        const { data: watchs } = await ProductService.getProductWatchById(
          productId,
          {
            populates: ['client']
          }
        );
        watchs && watchs.length && watchs.forEach(v => _users.push(v.client));
      } catch (e) {
      } finally {
        setUsers(_users);
      }
    };
    fetchData();
  }, [productId, setUsers]);
  const onModalClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);
  const onClick = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);

  return (
    <div>
      <Modal.Default
        shouldOpenModal={modalOpen}
        title={
          modalTitle || intl.formatMessage({ id: 'product_watch_list_display' })
        }
        onModalClose={onModalClose}
        content={closeModal => (
          <UserListContainer>
            {users && users.length
              ? users.map(user => {
                  return (
                    <UserItem key={user._id}>
                      <UserNameWrapper>
                        {user && user.avatars && user.avatars[0] ? (
                          <UserAvatar
                            avatarStyle={{
                              height: 40,
                              width: 40,
                              borderRadius: 20
                            }}
                            fileMetaId={user.avatars[0].fileMeta}
                          />
                        ) : (
                          <div
                            style={{
                              height: 41,
                              width: 41,
                              borderRadius: 40,
                              border: '1px solid #eee'
                            }}
                          />
                        )}
                        <div style={{ marginLeft: 10 }}>
                          {formatUserName(user)}
                        </div>
                      </UserNameWrapper>
                    </UserItem>
                  );
                })
              : undefined}
          </UserListContainer>
        )}
      />
      <FieldContainer>
        <div onClick={onClick}>
          {children ? (
            children
          ) : (
            <Button type="button" style={{ margin: 0 }}>
              {intl.formatMessage({ id: 'product_watch_list_display' })}
            </Button>
          )}
        </div>
      </FieldContainer>
    </div>
  );
};

export default injectIntl(ProductWatchButton);
