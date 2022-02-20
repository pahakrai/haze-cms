import React from 'react'
import styled from 'styled-components'

import FieldLabel_ from './FieldLabel'
import FieldContainer from './FieldContainer'

export const RequireMark = styled.div`
  color: #f49e0e;
  font-size: 18px;
  position: absolute;
  margin-left: -13px;
  margin-top: 2px;
`

export const FieldLabel = styled(FieldLabel_)`
  font-weight: 600;
  color: #666666;
  font-size: ${(props) => props.theme.fonts.size.h5};
`

// Horizontal
export const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: ${({ center = true }) => (center ? 'center' : 'flex-start')};
`
// ${props => (props.error ? 'margin-bottom: 30px;' : '')};
export const HorizontalContainerWrapper = ({
  horizontal = false,
  children,
  ...props
}) =>
  !horizontal ? (
    <>{children}</>
  ) : (
    <FieldContainer {...props}>{children}</FieldContainer>
  ) //styled(FieldContainer)``;
const HorizontalErrorContainerX = styled.div`
  display: flex;
  flex-direction: row;
`
const HorizontalErrorContent = styled.div``

const HorizontalErrorHiddenContent = styled.div`
  visibility: hidden;
  height: 0px;
  overflow: hidden;
`
export const HorizontalErrorContainer = ({ leftComponent, children }) => {
  return (
    <HorizontalErrorContainerX>
      <HorizontalErrorHiddenContent>
        {leftComponent}
      </HorizontalErrorHiddenContent>
      <HorizontalErrorContent>{children}</HorizontalErrorContent>
    </HorizontalErrorContainerX>
  )
}

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const HorizontalFieldLabel = styled(FieldLabel)`
  margin-right: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const TextInputWrapper = styled.div`
  ${(props) => (props.horizontal ? 'flex: 1;' : '')}
`
