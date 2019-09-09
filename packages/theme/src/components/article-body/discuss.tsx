import * as React from 'react'
import { get } from 'lodash'
import { MetaContext } from '../layout/index'
import { linkStyles } from '../footer/styles'

import { discussStyles } from './styles'

export function FooterDiscuss() {
  const { location } = React.useContext(MetaContext)
  const origin = get(location, 'origin', 'krapiva.org')
  const pathname = get(location, 'pathname', '//').replace(/\/$/, '')

  return (
    <div css={discussStyles}>
      <span>Обсудить статью в</span>
      <span>{' · '}</span>
      <a
        css={linkStyles}
        href={`https://vk.com/search?c%5Bper_page%5D=40&c%5Bq%5D=${origin}${pathname}&c%5Bsection%5D=statuses`}
        rel="noopener noreferrer"
        target="_blank"
      >VK</a>
      <span>{' · '}</span>
      <a
        css={linkStyles}
        href={`https://www.facebook.com/search/posts/?q=${origin}${pathname}&epa=SERP_TAB`}
        rel="noopener noreferrer"
        target="_blank"
      >FB</a>
      <span>{' · '}</span>
    </div>
  )
}
