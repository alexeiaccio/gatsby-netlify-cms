import * as React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

interface WrapperProps {
  sticked: boolean
  children: JSX.Element
}

export const Wrapper = React.forwardRef((props: WrapperProps, ref: any) => {
  return (
    <div
      css={css`
        ${tw`
          absolute
          inset-0 bottom-auto
          z-50
        `};
        ${props.sticked && tw`fixed py-0`};
      `}
      ref={ref}
    >
      {props.children}
    </div>
  )
})
