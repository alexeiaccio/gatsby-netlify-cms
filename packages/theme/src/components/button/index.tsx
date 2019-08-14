import * as React from 'react'
// import { css } from '@emotion/core'
import styled from '@emotion/styled'
// import tw from 'tailwind.macro'

import { outlinedTemplate } from './styles'

const StyledButton = styled('button')`
  ${outlinedTemplate};
  border-radius: ${props => props.rounded}rem;
  color: ${props => props.color};
  font-size: ${props => props.size}rem;
  padding: ${props => props.size * 0.5}rem ${props => props.size}rem;
`

interface ButtonProps {
  children: JSX.Element
  color?: string
  rounded?: number
  size?: number
}

export function Button({
  children,
  color = '#0cf3ad',
  rounded = 0,
  size = 0.75,
}: ButtonProps): JSX.Element {
  return (
    <StyledButton
      color={color}
      rounded={rounded}
      size={size}
    >
      {children}
    </StyledButton>
  )
}