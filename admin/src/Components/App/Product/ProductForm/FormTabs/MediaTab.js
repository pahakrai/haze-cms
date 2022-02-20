import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import ObjectID from 'bson-objectid';
import EcommCommonType from '@golpasal/common';

import Card from '../../../../Common/Card';
import Button from '../../../../Common/Button';
import TextInput from '../../../../Form/TextInput';
import Uploader from '../../../../Form/Uploader';

import {
  TitleItemWrapper,
  ItemWrapper,
  Item,
  ButtonWrapper
} from './MediaTab.styled';

const { WorkspaceType } = EcommCommonType.type;

const buttonStyle = {
  height: 42,
  minWidth: 50,
  fontSize: 20,
  lineHeight: '40px',
  margin: 0,
  padding: 0
};
const GET_INIT_VALUE = () => ({
  _id: new ObjectID().toHexString()
});

export const MediaTab = ({ intl, workspaceType }) => {
  const getProductMedia1 = (intl, workspaceType) => {
    let localeKey =
      {
        [WorkspaceType.EDUCATION]: 'display_course_media1'
      }[workspaceType] || 'product_mediaList1_display';
    return intl.formatMessage({ id: localeKey });
  };

  const getProductMedia2 = (intl, workspaceType) => {
    let localeKey =
      {
        [WorkspaceType.EDUCATION]: 'display_course_media2'
      }[workspaceType] || 'product_mediaList2_display';
    return intl.formatMessage({ id: localeKey });
  };

  return (
    <>
      <MediaListInput
        intl={intl}
        name="mediaList1"
        label={intl.formatMessage({
          id: getProductMedia1(intl, workspaceType)
        })}
      />
      <MediaListInput
        intl={intl}
        name="mediaList2"
        label={intl.formatMessage({
          id: getProductMedia2(intl, workspaceType)
        })}
      />
      <MediaListInput
        intl={intl}
        name="mediaList3"
        label={intl.formatMessage({
          id: 'display_media_internal'
        })}
      />
    </>
  );
};

const MediaListInput = props => {
  return <Field component={MediaListInput_} {...props} />;
};

const MediaListInput_ = ({
  intl,
  label,
  input: { value: items = [], name, onChange }
}) => {
  return (
    <>
      <Card.Title style={{ margin: 0 }}>{label}</Card.Title>
      <Card.Content
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          overflow: 'visible'
        }}
      >
        <TitleItemWrapper>
          <Item>
            <FormattedMessage id="display_media" />
          </Item>
          <Item>
            <FormattedMessage id="display_description" />
          </Item>
        </TitleItemWrapper>
        {Array.isArray(items)
          ? items.map((v, index) => {
              return (
                <ItemWrapper key={index}>
                  <Item style={{ textAlign: 'left' }}>
                    <Uploader
                      intl={intl}
                      name={`${name}[${index}].image`}
                      fileMaxSize={1050000 * 20}
                      noLabel
                      formatMulti={true}
                      displayFileMetas={false}
                    />
                  </Item>
                  <Item>
                    <div
                      style={{
                        visibility: 'hidden',
                        display: 'flex',

                        alignItems: 'center',
                        borderBottom: '1px solid #e4e4e4',
                        paddingBottom: '10px'
                      }}
                    >
                      <div style={{ flex: 1, fontSize: 12 }}>
                        {intl.formatMessage(
                          {
                            id: 'display_media_placeholder'
                          },
                          {
                            type: ' jpg / jpeg / png',
                            size: '1'
                          }
                        )}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flex: 1,
                          justifyContent: 'flex-end'
                        }}
                      >
                        <div>
                          <div style={{ cursor: 'pointer', display: 'flex' }}>
                            {intl.formatMessage({
                              id: 'display_media_library_selection'
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <TextInput
                      label={intl.formatMessage({
                        id: 'display_description'
                      })}
                      name={`${name}[${index}].description`}
                      noLabel
                      style={{ height: 265 }}
                      rows={8}
                    />
                  </Item>
                  <Button.Danger
                    style={{
                      ...buttonStyle,
                      marginLeft: 5,
                      marginBottom: 22,
                      fontSize: 14
                    }}
                    type="button"
                    onClick={() => {
                      onChange(items.filter((v, i) => i !== index));
                    }}
                  >
                    x
                  </Button.Danger>
                </ItemWrapper>
              );
            })
          : null}
        {/* <Error name={name} /> */}
        <ButtonWrapper>
          {(!items || !items.length) && (
            <div
              style={{
                flex: 1,
                textAlign: 'center'
              }}
            >
              <FormattedMessage id="msg.product_no_media" />
            </div>
          )}
          <Button
            style={buttonStyle}
            type="button"
            onClick={() =>
              onChange(
                Array.isArray(items)
                  ? [...items, GET_INIT_VALUE()]
                  : [GET_INIT_VALUE()]
              )
            }
          >
            +
          </Button>
        </ButtonWrapper>
      </Card.Content>
    </>
  );
};
