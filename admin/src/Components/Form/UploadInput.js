import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Tag } from 'antd';
import Dropzone from 'react-dropzone';
import { injectIntl } from 'react-intl';

import { toast } from '../../Lib/Toast';

import FileMetaImage from '../../Containers/FileMetaImage';

import { UPLOAD_ACCEPT_TYPE } from './Uploader';

import Button from '../Common/Button';
import { ErrorMessage } from './Errors';
import FieldContainer from './FieldContainer';
import {
  RequireMark,
  HorizontalContainer,
  HorizontalErrorContainer,
  HorizontalFieldLabel,
  TextInputWrapper,
  FieldLabel,
  HorizontalContainerWrapper
} from './form.styled';

const RelativeDiv = styled.div`
  position: relative;
`;

const AbsoluteSpan = styled.span`
  position: absolute;
  right: 0;
  cursor: pointer;
`;

const InputView = styled.div`
  border-radius: 0px;
  border: 1px solid rgb(236, 237, 237);
  font-weight: 600;
  color: rgb(117, 117, 117);
  font-size: 16px;
  background-color: rgb(239, 243, 246);
  height: 42px;
  min-width: 100px;
  padding: 6px 10px;
  cursor: pointer;
  text-align: left;
  line-height: 1.5;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImageItemContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ImageItem = ({
  src,
  name,
  fileMetaId,
  style = {},
  onDeleteClick
}) => {
  return (
    <ImageItemContainer style={style}>
      <Button.Danger
        onClick={onDeleteClick}
        type="button"
        style={{
          padding: '4px 12px',
          minWidth: 'unset',
          margin: 0,
          marginRight: 10
        }}
      >
        x
      </Button.Danger>
      {fileMetaId ? (
        <FileMetaImage
          component={({ src, fileMeta }) => (
            <React.Fragment>
              <img alt={'not found'} src={src} style={{ height: 50 }} />
              <span style={{ marginLeft: 10 }}>
                {fileMeta ? fileMeta.originalName : ''}
              </span>
            </React.Fragment>
          )}
          fileMetaId={fileMetaId}
        />
      ) : (
        <React.Fragment>
          <img src={src} alt="" style={{ height: 50 }} />
          <span style={{ marginLeft: 10 }}>{name}</span>
        </React.Fragment>
      )}
    </ImageItemContainer>
  );
};

const UploadInput = props => {
  const {
    input,
    label,
    noLabel = false,
    labelStyle,
    tagProps,
    // type,
    disabled,
    meta: { touched, error, warning },
    placeholder,
    accessory,
    accessoryContainerStyle,
    onAccessoryClick,
    // inputProps = {},
    horizontal = false,
    requireMark = false,
    error: hasErrorCompoennt = true,
    multiple = false,
    accept = `${UPLOAD_ACCEPT_TYPE.IMAGE}`,
    fileMaxSize = 1050000,
    fileMinSize = 1,
    intl,
    containerStyle
    // onRef
  } = props;

  let Container = FieldContainer;
  let Label = FieldLabel;

  const errorMessage =
    hasErrorCompoennt &&
    touched &&
    ((error && <ErrorMessage>{error}</ErrorMessage>) ||
      (warning && <ErrorMessage>{warning}</ErrorMessage>));

  if (horizontal) {
    Container = HorizontalContainer;
    Label = HorizontalFieldLabel;
  }

  const labelComponent = (
    <Label style={labelStyle}>
      {requireMark && <RequireMark>*</RequireMark>}
      <span>{label}</span>
      {tagProps && <Tag color={tagProps.color}>{tagProps.name}</Tag>}
    </Label>
  );

  const onDropRejected = files => {
    const file = files[0];
    if (file.size > fileMaxSize) {
      toast.warn(
        intl.formatMessage(
          {
            id: 'error.file.beyond_size'
          },
          { name: file.name }
        )
      );
    } else {
      toast.warn(
        intl.formatMessage(
          {
            id: 'error.file.reject_file'
          },
          { name: file.name }
        )
      );
    }
  };
  return (
    <HorizontalContainerWrapper
      style={horizontal ? containerStyle : undefined}
      horizontal={horizontal}
    >
      <Container
        style={horizontal ? undefined : containerStyle}
        error={Boolean(errorMessage)}
      >
        {!noLabel && labelComponent}
        <TextInputWrapper horizontal={horizontal}>
          <RelativeDiv>
            <div>
              <Dropzone
                disabled={disabled}
                accept={accept}
                maxSize={fileMaxSize}
                minSize={fileMinSize}
                multiple={multiple}
                onDropRejected={onDropRejected}
                onDrop={acceptedFiles => {
                  const files = acceptedFiles.map(acceptedFile => {
                    acceptedFile.preview = URL.createObjectURL(acceptedFile);
                    return acceptedFile;
                  });
                  input.onChange(files);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <InputView>
                      <img
                        src="/images/icons/upload.png"
                        alt="icon"
                        style={{ width: 25 }}
                      />
                      <span style={{ marginLeft: 10 }}>
                        {placeholder || label}
                      </span>
                    </InputView>
                  </div>
                )}
              </Dropzone>
            </div>
            <AbsoluteSpan
              style={accessoryContainerStyle}
              onClick={onAccessoryClick}
            >
              {accessory}
            </AbsoluteSpan>
          </RelativeDiv>
          {!horizontal && errorMessage}
        </TextInputWrapper>
      </Container>
      <HorizontalErrorContainer leftComponent={labelComponent}>
        {horizontal && errorMessage}
        {Array.isArray(input.value) &&
          input.value.map((v, index) => {
            v = v || {};
            return (
              <ImageItem
                key={index}
                src={v.preview}
                name={v.name}
                fileMetaId={v.fileMeta}
                onDeleteClick={() => {
                  if (Array.isArray(input.value)) {
                    input.onChange(input.value.filter((v, i) => i !== index));
                  }
                }}
              />
            );
          })}
      </HorizontalErrorContainer>
    </HorizontalContainerWrapper>
  );
};
const _UploadInput = injectIntl(UploadInput);

export default props => {
  return <Field {...props} component={_UploadInput} />;
};
