import React, { useState, useCallback, PureComponent } from 'react';
import { Field } from 'redux-form';
import { injectIntl } from 'react-intl';

import WorkspaceService from '../../../Services/APIServices/WorkspaceService';

import Modal from '../../../Components/Modal';
import Button from '../../../Components/Common/Button';
import { ErrorMessage } from '../../../Components/Form/Errors';
import FieldContainer from '../../../Components/Form/FieldContainer';

import ModalContent from './ModalContent';

const DEFAULT_CONTROL = { set: v => v._id, get: v => v };
export const SelectWorkspaceModal = injectIntl(
  ({
    modalTitle,
    children,
    intl,
    query,
    style,
    value: formValue,
    onChange,
    meta: { touched, error } = {},
    control = DEFAULT_CONTROL,
    modal = true,
    disabled,
    label,
    multiple = false
  }) => {
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    // const [searchKeyWord, setSearchKeyWord] = useState(true);
    const { allData, searchData, searchWorkspace } = useSearhWorkspaces({
      query,
      setLoading
      // setSearchKeyWord
    });
    const onClick = useCallback(() => {
      setModalOpen(true);
    }, []);
    const onModalClose = useCallback(() => {
      setModalOpen(false);
    }, []);
    const onConfirm = useCallback(
      value => {
        onChange(multiple ? value : value && value[0]);
        setModalOpen(false);
      },
      [onChange, multiple]
    );

    const modalContent = (
      <ModalContent
        intl={intl}
        selected={multiple ? formValue : formValue ? [formValue] : []}
        control={control}
        onConfirm={onConfirm}
        loading={loading}
        allData={allData}
        searchData={searchData}
        searchWorkspace={searchWorkspace}
        onChange={onChange}
        disabled={disabled}
        multiple={multiple}
      />
    );

    return (
      <>
        <SelectWorkspaceModalLauncher
          {...{ modal, modalOpen, searchWorkspace }}
        />
        <FieldContainer style={style}>
          <div onClick={onClick}>
            {children ? (
              typeof children === 'function' ? (
                children(formValue, {
                  disabled,
                  workspace: allData && allData[formValue]
                })
              ) : (
                children
              )
            ) : (
              <Button type="button" style={{ minWidth: 'auto' }}>
                {intl.formatMessage({ id: 'display_select' })}
              </Button>
            )}
          </div>
          {touched && error && <ErrorMessage>{error}</ErrorMessage>}
        </FieldContainer>
        {modal ? (
          <Modal.Default
            contentStyle={{ maxWidth: '112rem' }}
            shouldOpenModal={modalOpen}
            title={modalTitle || intl.formatMessage({ id: 'display_select' })}
            onModalClose={onModalClose}
            content={() => modalContent}
          />
        ) : (
          modalContent
        )}
      </>
    );
  }
);
class SelectWorkspaceModalLauncher extends PureComponent {
  componentDidMount() {
    const { searchWorkspace } = this.props;
    searchWorkspace();
  }
  componentDidUpdate(prevProps) {
    const { modalOpen, modal, searchWorkspace } = this.props;
    if (modal !== prevProps.modal || modalOpen !== prevProps.modalOpen) {
      if (!modal || (modal && modalOpen)) {
        searchWorkspace();
      }
    }
  }
  render = () => null;
}
export const SelectWorkspaceModalWithField = ({ input, ...props }) => {
  return (
    <SelectWorkspaceModal
      {...props}
      value={input.value}
      onChange={input.onChange}
    />
  );
};

export const useSearhWorkspaces = ({ query, setLoading, setSearchKeyWord }) => {
  // workspace data
  const [allData, setAllData] = useState({});
  const [searchData, setSearchData] = useState([]);

  const searchWorkspace = useCallback(
    keyword => {
      const request = async () => {
        try {
          setLoading && setLoading(true);
          const result = await WorkspaceService.getWorkspaces({
            q: keyword || undefined,
            sort: '-createdAt',
            offset: 0,
            limit: 999,
            paginate: true,
            ...(query || {})
          });

          const data = (result && result.data && result.data.docs) || [];
          setAllData(
            data.reduce(
              (r, value) => ({ ...r, [value && value._id]: value }),
              allData
            )
          );
          setSearchData(data);
          setSearchKeyWord && setSearchKeyWord(keyword);
        } catch (e) {
        } finally {
          setLoading && setLoading(false);
        }
      };

      request();
    },
    [setLoading, query, allData, setSearchKeyWord]
  );

  return { allData, searchData, searchWorkspace };
};

export default props => (
  <Field component={SelectWorkspaceModalWithField} {...props} />
);
