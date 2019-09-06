import * as React from 'react'
import { get } from 'lodash'

import { MetaContext, StateContext } from '../layout/index'

import { viewsStyles, burnsStyles } from './styles'

export function Views() {
  const { location } = React.useContext(MetaContext)
  const { views } = React.useContext(StateContext)
  const page = get(views, location.pathname)
  if (!page) { return null }

  return (
    <React.Fragment>
      <span
        css={viewsStyles}
        title={`${page.views} просмотр${page.views < 5 ? page.views === 1 ? '' : 'a' : 'ов'}`}
      > {page.views} ·</span>
      <span
        css={burnsStyles}
        title={`${page.burns} раз${(page.burns > 1 % 10) && (page.burns % 10) < 5 ? 'a' : ''} прижгли`}
      > {page.burns} ·</span>
    </React.Fragment>
  )
}