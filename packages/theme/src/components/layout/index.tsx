import * as React from 'react'
import { Global, css } from '@emotion/core'

import '../../fonts/cormorant/stylesheet.css'
import '../../fonts/montserrat/stylesheet.css'
import '../../utils/globals.css'

import { WrappedHeader } from '../header/index'
import { Main } from '../main/index'

import { Borders } from './styles'
import globalStyles from './global'

export const MetaContext = React.createContext<any>(null)

interface LayoutProps {
  children: JSX.Element
  location?: any
  meta?: any
  index?: any
  blackHeader?: boolean
}

function LayoutComponent({ children, location, meta, index, blackHeader }: LayoutProps): JSX.Element {

  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <Borders />
      <MetaContext.Provider value={{ location, meta, index, blackHeader }}>
        <WrappedHeader />
        <Main>
          {children}
        </Main>
      </MetaContext.Provider>
    </React.Fragment>
  )
}

export const Layout = React.memo(LayoutComponent)
