import * as React from 'react'
import { get } from 'lodash'
import { Link as GatsbyLink } from 'gatsby'
import { useLocation } from 'react-use'

import { APIS } from '@krapiva-org/utils/defaults/apis'


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

  const location = useLocation()

  const regExp = /^https?\:\/\/([a-z0-9._%+-]+)\.krapiva/
  const href = get(location, 'href', '')
  const host = get(regExp.exec(href), '1', '')

  if (api && (host !== api) && !href.includes('localhost')) {
    return (
      <a href={`https://${get(APIS, api, 'www')}.krapiva.org/${to}`} {...props}>
        {children}
      </a>
    )
  }

  return (
    <GatsbyLink to={`/${to}`} {...props}>
      {children}
    </GatsbyLink>
  )
}
