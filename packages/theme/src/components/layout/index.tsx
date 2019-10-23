import * as React from 'react'
import { Global } from '@emotion/core'
import { useLocalStorage, useMedia, useSessionStorage } from 'react-use'

import '../../fonts/cormorant/stylesheet.css'
import '../../fonts/montserrat/stylesheet.css'
import '../../utils/globals.css'

import '../../utils/polifil.js'

import { Footer } from '../footer/index'
import { WrappedHeader } from '../header/index'
import { Main } from '../main/index'
import { SEO } from '../seo/index'
import { Index } from '../../typings/index'
import { Meta } from '../../typings/meta'
import { Seo } from '../../typings/seo'

import { Borders } from './styles'
// import { HeaderBunners } from './bunners'
import globalStyles from './global'

export const MetaContext = React.createContext<any>({
  location: {},
  meta: {},
  index: {},
  blackHeader: false,
})
export const StateContext = React.createContext<any>({
  views: {},
  setViews: () => {},
  isDark: false,
  toggleDarkMode: () => {}
})

interface LayoutProps {
  children: JSX.Element
  location?: any
  meta?: Meta
  index?: Index
  seo?: Seo
  blackHeader?: boolean
  pagesIndex?: boolean
}

function LayoutComponent({
  children, location, meta,
  index, seo, blackHeader, pagesIndex
}: LayoutProps): JSX.Element {
  const [views, setViews] = useSessionStorage('views', null)
  const isDarkPreferScheme = useMedia('(prefers-color-scheme: dark)')
  const [isDark, toggleDarkMode] = useLocalStorage('darkTheme', isDarkPreferScheme)

  return (
    <React.Fragment>
      <Global styles={globalStyles} />
      <SEO meta={meta} location={location} data={seo} />
      <Borders />
      {/* <HeaderBunners index={index} /> */}
      <MetaContext.Provider value={{ location, meta, index, blackHeader, pagesIndex }}>
        <StateContext.Provider value={{ views, setViews, isDark, toggleDarkMode }}>
          <WrappedHeader />
          <Main isDark={isDark}>
            {children}
          </Main>
          <Footer />
        </StateContext.Provider>
      </MetaContext.Provider>
    </React.Fragment>
  )
}

export const Layout = React.memo(LayoutComponent)
