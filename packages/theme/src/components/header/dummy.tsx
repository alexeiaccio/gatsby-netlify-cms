import * as React from 'react'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { MetaContext } from '../layout/index'

interface WrapperProps {
  height: number
}

export const Dummy = React.forwardRef((props: WrapperProps, ref) => {
  const { blackHeader = false } = React.useContext(MetaContext)

  return (
    <div
      css={css`
        ${tw`relative`}; 
        ${blackHeader ? tw`bg-black` : tw`bg-white`}; 
        height: ${props.height}px;
      `}
      ref={ref}
    />
  )
})
