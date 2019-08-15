import * as React from 'react'
// import { css } from '@emotion/core'
import styled from '@emotion/styled'
// import tw from 'tailwind.macro'

import { outlinedTemplate } from './styles'

export const StyledButton = styled('button')`
  ${outlinedTemplate};
  background-color: ${props => props.inverted ? props.color : '#fff'};
  border-radius: ${props => props.rounded}rem;
  border-color: ${props => props.color};
  color: ${props => props.inverted ? '#fff' : props.color};
  font-size: ${props => props.size}rem;
  padding: ${props => props.size * 0.5}rem ${props => props.size}rem;
  /* disabled */
  background-color: ${props => props.disabled && props.inverted && '#a0aec0'};
  border-color: ${props => props.disabled && '#a0aec0'};
  color: ${props => props.disabled && !props.inverted && '#a0aec0'};
  cursor: ${props => props.disabled && 'not-allowed'};
  /* hover */
  &:hover {
    background-color: ${props => props.inverted ? '#fff' : props.color};
    color: ${props => props.inverted ? props.color : '#fff'};
    /* disabled */
    background-color: ${props => props.disabled && !props.inverted && '#a0aec0'};
    color: ${props => props.disabled && props.inverted && '#a0aec0'};
  }
  ${props => props.styles};
`

const noop = () => {};

export interface ButtonStyles {
  color?: string
  disabled?: boolean
  inverted?: boolean
  rounded?: number
  size?: number
}

interface ButtonProps extends ButtonStyles {
  children: JSX.Element | string
  onClick?: (props: any) => any; 
  styles?: string
}

export function Button({
  children,
  color = '#0cf3ad',
  disabled = false,
  onClick = noop,
  inverted = false,
  rounded = 0,
  styles,
  size = 0.75,
}: ButtonProps): JSX.Element {
  return (
    <StyledButton
      color={color}
      disabled={disabled}
      onClick={onClick}
      inverted={inverted}
      rounded={rounded}
      styles={styles}
      size={size}
    >
      {children}
    </StyledButton>
  )
}