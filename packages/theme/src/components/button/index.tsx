import * as React from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { outlinedTemplate } from './styles'

export const StyledButton = styled('button')`
  ${outlinedTemplate};
`

const noop = () => { };

export interface ButtonStyles {
  color?: string
  disabled?: boolean
  contrast?: boolean
  inverted?: boolean
  rounded?: number
  size?: number
}

export interface ButtonProps extends ButtonStyles {
  children?: JSX.Element | JSX.Element[] | string
  component?: JSX.Element | string | null
  onClick?: (() => any) | undefined
  styles?: string
  to?: string | null
  href?: string
  rel?: string
  target?: string
  css?: any
  type?: string
}

export function Button({
  component,
  children,
  color = '#0cf3ad',
  disabled = false,
  contrast = false,
  inverted = false,
  onClick = noop,
  rounded = 0,
  styles,
  size = 0.75,
  ...args
}: ButtonProps): JSX.Element {
  let props = {}
  let ButtonComponent = StyledButton
  if (component) {
    ButtonComponent = StyledButton.withComponent(component)
  }

  if (styles) { props = { ...props, styles } }

  return (
    <ButtonComponent
      css={css`
        background-color: ${inverted ? color : '#fff  !important'};
        background-color: ${contrast && !inverted && '#000  !important'};
        border-radius: ${rounded}rem;
        border-color: ${color};
        color: ${inverted ? '#fff' : `${color}  !important`};
        color: ${contrast && inverted && '#000 !important'};
        font-size: ${size}rem;
        padding: ${size * 0.5}rem ${size}rem;
        /* disabled */
        background-color: ${disabled && inverted && '#a0aec0'};
        border-color: ${disabled && '#a0aec0'};
        color: ${disabled && !inverted && '#a0aec0'};
        cursor: ${disabled && 'not-allowed'};
        /* hover */
        &:hover {
          background-color: ${inverted ? '#fff' : `${color}  !important`};
          background-color: ${contrast && inverted && '#000  !important'};
          color: ${inverted ? `${color}  !important` : '#fff !important'};
          color: ${contrast && !inverted && '#000 !important'};
          /* disabled */
          background-color: ${disabled && !inverted && '#a0aec0'};
          color: ${disabled && inverted && '#a0aec0'};
        }
        ${styles};
      `}
      onClick={onClick}
      {...props}
      {...args}
    >
      {children}
    </ButtonComponent>
  )
}