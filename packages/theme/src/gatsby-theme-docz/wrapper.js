import React from 'react'
import { Global } from '@emotion/core'

import '../fonts/cormorant/stylesheet.css'
import '../fonts/montserrat/stylesheet.css'
import '../utils/globals.css'

import globalStyles from '../components/layout/global'

export default ({ children }) => (
  <React.Fragment>
    <Global styles={globalStyles} />
    {children}
  </React.Fragment>
)
