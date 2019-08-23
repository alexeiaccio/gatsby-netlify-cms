import * as React from 'react'
import { get } from 'lodash'
import { Link as GatsbyLink } from 'gatsby'

import { APIS } from '@krapiva-org/utils/defaults/apis'

import { MetaContext } from '../layout/index'

interface LinkProps {
  api?: string
  css?: any
  children: JSX.Element
  key?: any
  to?: string
}

export function Link({ api, children, to, ...props }: LinkProps) {
  if (!to) {
    return <span {...props}>{children}</span>
  }

  const { location } = React.useContext(MetaContext)

  const regExp = /^https?\:\/\/([a-z0-9._%+-]+)\.krapiva/
  const href = get(location, 'href', '')
  const host = get(regExp.exec(href), '1', 'www')

  if (host !== api && !href.includes('localhost')) {
    return (
      <a href={`https://${APIS[api]}.krapiva.org/${to}`} {...props}>
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