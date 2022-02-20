import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import Common from '@golpasal/common';

import { withFormValues } from '../../../../Form/utils';
import SelectAddress from '../../../../../Containers/Form/SelectAddress';
import AddressSelectWithMap from '../../../../../Containers/Form/SelectAddress/AddressSelectWithMap';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-bottom: 32px;
`;
const MarkContainer = styled.div`
  width: 20px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const RegionName = styled.div`
  margin-left: 26px;
`;
const FromMark = styled.div`
  height: 12px;
  width: 12px;
  background: #fff;
  border: 3px solid #000;
  border-radius: 8px;
`;
const ToMark = styled.div`
  height: 0px;
  width: 0px;
  border: 3px solid #999;
  border-radius: 5px;
  position: relative;
  z-index: 1;
`;
const ToMarkLine = styled.div`
  position: absolute;
  top: -28px;
  left: 8.5px;
  width: 1px;
  height: 30px;
  background-color: #ccc;
  z-index: 0;
`;
const MoreToMark = styled.div`
  height: 12px;
  width: 12px;
  background: #fff;
  border: 3px solid ${props => props.theme.color.primary};
  border-radius: 8px;
`;

const LocationButton = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.color.primary};
  height: 42px;
  width: 42px;
  cursor: pointer;
  font-size: 37px;
  font-weight: 400;
  line-height: 39px;
  color: #fff;
  position: absolute;
  top: 28px;
  right: 0;
`;

const OrderLocationComponent = ({
  updateMode,
  formValueLocaltionTo,
  intl,
  disabled,
  formValueChange,
  form,
  currentWorkspace,
  allowEdit,
  hideLocTo
}) => {
  const locToName = 'logistic.locTo';
  const localtionNo =
    formValueLocaltionTo && formValueLocaltionTo.length
      ? formValueLocaltionTo.length - 1
      : 0;
  const useGoogleApi =
    currentWorkspace &&
    currentWorkspace.preferences &&
    currentWorkspace.preferences.mapType === Common.type.MapType.GOOGLE_MAP;
  const AddressInput = useGoogleApi ? AddressSelectWithMap : SelectAddress;
  const addressInputProps = {
    showLocalLocationButton: false,
    showDetailedAddressInput: false
  };
  const onLocationAddClick = () => {
    if (Array.isArray(formValueLocaltionTo)) {
      formValueChange(locToName, [...formValueLocaltionTo, {}]);
    } else {
      formValueChange(locToName, [{}, {}]);
    }
  };
  const onLocationRemove = index => {
    const values = [...formValueLocaltionTo];
    values.splice(index, 1);
    formValueChange(locToName, values);
  };
  if (disabled) {
    return (
      <>
        <LocationLineFrom name="logistic.locFr" />
        {!hideLocTo &&
          Array(localtionNo + 1)
            .fill('')
            .map((v, index) => (
              <LocationLineTo
                key={index}
                name={`${locToName}[${index}]`}
                first={index === 0}
              />
            ))}
      </>
    );
  }
  return (
    <>
      <AddressInput
        intl={intl}
        disabled={disabled}
        name="logistic.locFr"
        label={intl.formatMessage({
          id: 'display_order_location_start'
        })}
        {...addressInputProps}
      />
      {!hideLocTo && (
        <>
          <AddressInput
            intl={intl}
            name={`${locToName}[0]`}
            label={intl.formatMessage({
              id: 'display_order_location_end'
            })}
            disabled={disabled}
            initializationData={false}
            {...addressInputProps}
            containerStyle={{ position: 'relative' }}
            renderRight={() => {
              return (
                <>
                  {allowEdit && (
                    <div>
                      <LocationButton onClick={onLocationAddClick}>
                        +
                      </LocationButton>
                      <div style={{ width: 42 }} />
                    </div>
                  )}
                </>
              );
            }}
          />
          {Array(localtionNo)
            .fill('')
            .map((v, index) => (
              <AddressInput
                key={index}
                intl={intl}
                name={`${locToName}[${index + 1}]`}
                label={intl.formatMessage(
                  {
                    id: 'display_order_location_end_num'
                  },
                  { num: index + 2 }
                )}
                disabled={disabled}
                {...addressInputProps}
                initializationData={false}
                containerStyle={{ position: 'relative' }}
                renderRight={() => {
                  return (
                    <>
                      {allowEdit && (
                        <div>
                          <LocationButton
                            onClick={() => onLocationRemove(index + 1)}
                          >
                            -
                          </LocationButton>
                          <div style={{ width: 42 }} />
                        </div>
                      )}
                    </>
                  );
                }}
              />
            ))}
        </>
      )}
    </>
  );
};

export const OrderLocation = withFormValues({
  fields: [['logistic.locTo', 'formValueLocaltionTo']]
})(OrderLocationComponent);

const formatRegionName = value => {
  return value?.properties?.name || '';
};

const LocationLineFrom_ = ({ input, intl }) => {
  const regionName = formatRegionName(input.value);
  return (
    <Container>
      <MarkContainer>
        <FromMark />
      </MarkContainer>
      <RegionName>{regionName}</RegionName>
    </Container>
  );
};
const LocationLineTo_ = ({ input, first, intl }) => {
  const regionName = formatRegionName(input.value);

  return (
    <Container>
      <MarkContainer>
        {first ? (
          <React.Fragment>
            <ToMark />
            <ToMarkLine />
          </React.Fragment>
        ) : (
          <MoreToMark />
        )}
      </MarkContainer>
      <RegionName>{regionName}</RegionName>
    </Container>
  );
};

export const LocationLineTo = props => {
  return <Field {...props} component={LocationLineTo_} />;
};

export const LocationLineFrom = props => {
  return <Field {...props} component={LocationLineFrom_} />;
};
