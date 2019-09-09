import * as React from 'react'
import { get } from 'lodash'
import { useInView } from 'react-intersection-observer'

import { Container } from '../main/index'
import { MetaContext } from '../layout/index'
import { linkStyles } from '../footer/styles'

import { useUpdateViews } from './use-update-views'
import { footerStyles } from './styles'

export function ArticleFooter() {
  const { location } = React.useContext(MetaContext)
  const origin = (document !== undefined) ? 
    get(document, 'location.origin')
    :
    get(location, 'origin', '')
  const pathname = get(location, 'pathname', '//').replace(/\/$/, '')
  const [ref, inView] = useInView({
    threshold: 0,
  })

  useUpdateViews(inView)

  return (
    <aside css={footerStyles} ref={ref}>
      <Container>
        <div>
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
      </Container>
    </aside>
  )
}
