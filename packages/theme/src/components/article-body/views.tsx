import * as React from 'react'
import { get } from 'lodash'
import { css } from '@emotion/core'

import { MetaContext, StateContext } from '../layout/index'

import { Icon } from './styles'
import * as eye from './eye.svg'
import * as burn from './burn.svg'
import * as eyeblack from './eye-black.svg'
import * as burnblack from './burn-black.svg'

export function Views({ onIndex }) {
  const { location } = React.useContext(MetaContext)
  const { views } = React.useContext(StateContext)
  const page = get(views, location.pathname.replace(/\/+$/, ''))

  if (!page) { return null }

  return (
    <React.Fragment>
      <Icon
        css={css`
          &::before {
            background-image: url(${onIndex ? eyeblack : eye});
          }
        `}
        title={`${page.views} просмотр${page.views < 5 ? page.views === 1 ? '' : 'a' : 'ов'}`}
      > {page.views} ·</Icon>
      <Icon
        css={css`
          &::before {
            background-image: url(${onIndex ? burnblack : burn});
          }
        `}
        title={`${page.burns} раз${(page.burns > 1 % 10) && (page.burns % 10) < 5 ? 'a' : ''} прижгли`}
      > {page.burns} ·</Icon>
    </React.Fragment>
  )
}