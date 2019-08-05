import React from 'react'
import { ThemeProvider } from 'theme-ui'
import doczTheme from 'gatsby-theme-docz/src/theme'

import theme from '../theme'

/**
 * @param {{ children: JSX.Element }} Node
 */

export default ({ children }) => (
  <ThemeProvider theme={{ ...doczTheme, ...theme }}>{children}</ThemeProvider>
)
