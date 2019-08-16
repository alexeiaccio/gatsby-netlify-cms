import * as React from 'react'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'

import '../../fonts/cormorant/stylesheet.css'
import '../../fonts/montserrat/stylesheet.css'
import '../../utils/globals.css'

import { WrappedHeader } from '../header/index'

import { Borders } from './styles'
import globalStyles from './global'


const Box = styled.h1`
  ${tw`text-blue-800`}
  width: 400px;
`

export const MetaContext = React.createContext<any>(null)

interface LayoutProps {
  children: JSX.Element
  location?: any
  meta?: any
}

function LayoutComponent({ children, location, meta }: LayoutProps): JSX.Element {

  return (
    <div
      css={css`
        ${tw`relative w-full h-full`};
      `}
    >
      <Global styles={globalStyles} />
      <Borders />
      <MetaContext.Provider value={{ location, meta }}>
        <WrappedHeader />
      </MetaContext.Provider>
      <Box>Woop!</Box>
      {children}
    </div>
  )
}

export const Layout = React.memo(LayoutComponent)
