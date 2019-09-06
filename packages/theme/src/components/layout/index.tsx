import * as React from 'react'
import { Global, css } from '@emotion/core'

import '../../fonts/cormorant/stylesheet.css'
import '../../fonts/montserrat/stylesheet.css'
import '../../utils/globals.css'

import { Footer } from '../footer/index'
import { WrappedHeader } from '../header/index'
import { Main } from '../main/index'
import { SEO } from '../seo/index'

import { Borders } from './styles'
import globalStyles from './global'

export const MetaContext = React.createContext<any>({})
export const StateContext = React.createContext<any>({})

interface LayoutProps {
  children: JSX.Element
  location?: any
  meta?: any
  index?: any
  seo?: any
  blackHeader?: boolean
}

function LayoutComponent({
  children, location, meta,
  index, seo, blackHeader
}: LayoutProps): JSX.Element {
  const [views, setViews] = React.useState(null)

  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <SEO meta={meta} location={location} data={seo} />
      <Borders />
      <MetaContext.Provider value={{ location, meta, index, blackHeader }}>
        <StateContext.Provider value={{ views, setViews }}>
          <WrappedHeader />
          <Main>
            {children}
          </Main>
          <Footer />
        </StateContext.Provider>
      </MetaContext.Provider>
    </React.Fragment>
  )
}

export const Layout = React.memo(LayoutComponent)
