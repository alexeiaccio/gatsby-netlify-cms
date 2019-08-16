import * as React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

interface BorderProps {
  side: 'right' | 'left' | 'top' | 'bottom'
}

export function Border({ side }: BorderProps) {
  return (
    <div
      css={css`
        ${tw`
          border-2 md:border-4 border-black border-solid 
          fixed inset-0
          z-10
        `};
        ${side === 'right' && tw`left-auto`};
        ${side === 'left' && tw`right-auto`};
        ${side === 'top' && tw`bottom-auto`};
        ${side === 'bottom' && tw`top-auto`};
      `}
    />
  )
}

export function Borders() {
  return (
    <React.Fragment>
      <Border side="right" />
      <Border side="left" />
      <Border side="top" />
      <Border side="bottom" />
    </React.Fragment>
  )
}