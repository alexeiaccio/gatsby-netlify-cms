import * as React from 'react'
import { Global } from '@emotion/core'

import '../fonts/cormorant/stylesheet.css'
import '../fonts/montserrat/stylesheet.css'
import '../utils/globals.css'

import globalStyles from '../components/layout/global'

interface Props {
  children: JSX.Element
}

export default ({ children }: Props) => (
  <React.Fragment>
    <Global styles={globalStyles} />
    {children}
  </React.Fragment>
)
