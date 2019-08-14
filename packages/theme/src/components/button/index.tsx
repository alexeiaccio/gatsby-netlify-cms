import * as React from 'react'
// import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import { outlinedTemplate } from './styles'

const StyledButton = styled('button')`
  ${outlinedTemplate};
  background-color: ${props => props.inverted ? props.color : '#fff'};
  border-radius: ${props => props.rounded}rem;
  border-color: ${props => props.color};
  color: ${props => props.inverted ? '#fff' : props.color};
  font-size: ${props => props.size}rem;
  padding: ${props => props.size * 0.5}rem ${props => props.size}rem;
  &:hover {
    background-color: ${props => props.inverted ? '#fff' : props.color};
    color: ${props => props.inverted ? props.color : '#fff'};
  }
`

interface ButtonProps {
  children: JSX.Element
  color?: string
  inverted?: boolean
  rounded?: number
  size?: number
}

export function Button({
  children,
  color = '#0cf3ad',
  inverted = false,
  rounded = 0,
  size = 0.75,
}: ButtonProps): JSX.Element {
  return (
    <StyledButton
      color={color}
      inverted={inverted}
      rounded={rounded}
      size={size}
    >
      {children}
    </StyledButton>
  )
}