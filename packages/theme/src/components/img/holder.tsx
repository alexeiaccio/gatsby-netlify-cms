import * as React from 'react'
import styled from '@emotion/styled'
// import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { Logo } from '../logo/index'

export const Holder = styled('div')`
  ${tw`
    flex items-center justify-center
    h-full w-full
    overflow-hidden
    rounded-sm
  `};
  background-color: var(--gray-light-color);
`

export const ImgHolder = props => (
  <Holder {...props}>
    <Logo
      height={100}
      angle={135}
    />
  </Holder>
)