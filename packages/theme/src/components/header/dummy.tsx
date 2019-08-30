import * as React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

interface WrapperProps {
  height: number
}

export const Dummy = React.forwardRef((props: WrapperProps, ref) => {
  return (
    <div
      css={css`${tw`relative bg-black`}; 
    height: ${props.height}px;`}
      ref={ref}
    />
  )
})
