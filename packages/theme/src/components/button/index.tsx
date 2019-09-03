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

interface ButtonProps extends ButtonStyles {
  children?: JSX.Element | JSX.Element[]
  component?: JSX.Element | string | null
  onClick?: (() => any) | undefined
  styles?: string
  to?: string | null
  href?: string
  rel?: string
  target?: string
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
  to,
  href,
  rel,
  target,
}: ButtonProps): JSX.Element {
  let props = {}
  let ButtonComponent = StyledButton
  if (component) {
    ButtonComponent = StyledButton.withComponent(component)
  }

  if (to) { props = { ...props, to } }
  if (href) { props = { ...props, href } }
  if (rel) { props = { ...props, rel } }
  if (styles) { props = { ...props, styles } }
  if (target) { props = { ...props, target } }

  return (
    <ButtonComponent
      css={css`
        background-color: ${inverted ? color : '#fff'};
        border-radius: ${rounded}rem;
        border-color: ${color};
        color: ${inverted ? '#fff' : color};
        font-size: ${size}rem;
        padding: ${size * 0.5}rem ${size}rem;
        /* disabled */
        background-color: ${disabled && inverted && '#a0aec0'};
        color: ${contrast && inverted && '#000'};
        border-color: ${disabled && '#a0aec0'};
        color: ${disabled && !inverted && '#a0aec0'};
        cursor: ${disabled && 'not-allowed'};
        /* hover */
        &:hover {
          background-color: ${inverted ? '#fff' : color};
          background-color: ${contrast && inverted && '#000'};
          color: ${inverted ? color : '#fff'};
          /* disabled */
          background-color: ${disabled && !inverted && '#a0aec0'};
          color: ${disabled && inverted && '#a0aec0'};
        }
        ${styles};
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonComponent>
  )
}