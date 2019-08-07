import * as React from 'react'
import { Global, css } from '@emotion/core'
import styled from "@emotion/styled"
import tw from 'tailwind.macro'

import '../../fonts/cormorant/stylesheet.css'
import '../../fonts/montserrat/stylesheet.css'
import '../../utils/globals.css'

import globalStyles from './global'


const Box = styled.h1`
  ${tw`text-blue-800`}
  width: 400px;
`

interface LayoutProps {
  children: JSX.Element
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div
      css={css`
        ${tw`text-red-800`};
      `}
    >
      <Global styles={globalStyles} />
      <Box>Woop!</Box>
      {children}
    </div>
  )
}
