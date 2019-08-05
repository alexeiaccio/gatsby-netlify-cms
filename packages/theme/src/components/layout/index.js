import React from 'react'
import { Global } from '@emotion/core'
import { Header } from 'theme-ui'

import '../../fonts/cormorant/stylesheet.css'
import '../../fonts/montserrat/stylesheet.css'

import globalStyles from './global'

/**
 *
 * @param {{ children: JSX.Element }} Nodes
 * @returns JSX.Element
 */

function Layout({ children }) {
  return (
    <>
      <Global styles={globalStyles} />
      <Header>Woop!</Header>
      {children}
    </>
  )
}

export default Layout
