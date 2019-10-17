import * as React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

interface WrapperProps {
  children: JSX.Element | JSX.Element[]
}

export const Wrapper = React.forwardRef(({ children }: WrapperProps, ref: any) => {
  return (
    <div
      css={css`
        ${tw`relative z-10`};
      `}
      ref={ref}
    >
      {children}
    </div>
  )
})
