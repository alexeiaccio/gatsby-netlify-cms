import * as React from 'react'
import { get } from 'lodash'
import { Link as GatsbyLink } from 'gatsby'

import { APIS } from '@krapiva-org/utils/defaults/apis'

import { MetaContext } from '../layout/index'

interface LinkProps {
  api?: string
  css?: any
  children?: JSX.Element
  key?: any
  to?: string
  target?: string
  internal?: boolean
}

export function Link({ api, children, internal, to,...props }: LinkProps) {
  if (!to) {
    return <span {...props}>{children}</span>
  }

  const { location } = React.useContext(MetaContext)
  const href = get(location, 'href', '')
  const host = process.env.PRISMIC_API

  if (href.includes('localhost:') || internal) {
    return (
      <GatsbyLink to={`/${to}`} {...props}>
        {children}
      </GatsbyLink>
    )
  }
 
  if (api) {
    if (host !== api) {
      return (
        <a href={`https://${get(APIS, api, host)}.krapiva.org${to}`} {...props}>
          {children}
        </a>
      )
    } else {
      return (
        <GatsbyLink to={`/${to}`} {...props}>
          {children}
        </GatsbyLink>
      )
    }
  } else {
    return (
      <a href={`https://${host}.krapiva.org${to}`} {...props}>
        {children}
      </a>
    )
  }
}
