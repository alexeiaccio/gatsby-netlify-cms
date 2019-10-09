import * as React from 'react'
import { get } from 'lodash'
import { Link as GatsbyLink } from 'gatsby'
import { useLocation } from 'react-use'

import { APIS } from '@krapiva-org/utils/defaults/apis'

import { MetaContext } from '../layout/index'

interface LinkProps {
  api?: string
  css?: any
  children?: JSX.Element
  key?: any
  to?: string
  target?: string
}

export function Link({ api, children, to, ...props }: LinkProps) {
  if (!to) {
    return <span {...props}>{children}</span>
  }
  
  const { meta } = React.useContext(MetaContext)
  const location = useLocation()

  const regExp = /^https?\:\/\/([a-z0-9._%+-]+)\.krapiva/
  const href = get(location, 'href', '')
  const host = get(regExp.exec(href), '1', '')

  if (api) {
    if ((host !== api) && !href.includes('localhost:')) {
      return (
        <a href={`https://${get(APIS, api, (meta.dev ? 'dev-main' : 'www'))}.krapiva.org${to}`} {...props}>
          {children}
        </a>
      )
    }

    if (href.includes('localhost:8002')) {
      return (
        <a href={`http://localhost:8001${to}`} {...props}>
          {children}
        </a>
      )
    }

    if (meta.dev && !href.includes('localhost:')) {
      return (
        <a href={`https://dev-pages.krapiva.org${to}`} {...props}>
          {children}
        </a>
      )
    }
  }

  if (!api && href.includes('localhost:8001')) {
    return (
      <a href={`http://localhost:8002${to}`} {...props}>
        {children}
      </a>
    )
  }

  if ((!api && (host === api)) || href.includes('localhost:')) {
    return (
      <GatsbyLink to={`/${to}`} {...props}>
        {children}
      </GatsbyLink>
    )
  }

  if (!api && meta.dev) {
    return (
      <a href={`https://dev-main.krapiva.org${to}`} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a href={`https://${meta.dev ? 'dev-main' : 'www'}.krapiva.org${to}`} {...props}>
      {children}
    </a>
  )
}
