import React from 'react'
import { ThemeProvider } from 'theme-ui'
import theme from './theme'

/**
 * @param {{ children: JSX.Element }} Node
 */

export default ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
