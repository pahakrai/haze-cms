import React from 'react'
import Popover from 'react-popover'
import styled from 'styled-components'

const PopoverWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px 20px;
  color: #fff;
`

export default ({ body, isOpen, style, children, ...rest }) => (
  <Popover
    style={style}
    isOpen={isOpen}
    body={<PopoverWrapper>{body}</PopoverWrapper>}
    {...rest}
  >
    {children}
  </Popover>
)
