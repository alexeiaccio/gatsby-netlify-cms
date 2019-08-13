import * as React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

interface WrapperProps {
  inView: boolean
  children: JSX.Element
}

export const Wrapper = React.forwardRef((props: WrapperProps, ref) => {
  return (
    <div
      css={css`
        ${tw`
          absolute
          inset-0 bottom-auto
          flex flex-col items-center
          py-2
          bg-black text-white
          select-none
          z-50
        `};
        ${!props.inView && tw`fixed py-0`};
      `}
      ref={ref}
    >
      {props.children}
    </div>
  )
})
