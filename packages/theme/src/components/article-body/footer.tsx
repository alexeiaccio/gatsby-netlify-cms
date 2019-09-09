import * as React from 'react'
import { useInView } from 'react-intersection-observer'

import { Container } from '../main/index'
import { MetaContext } from '../layout/index'
import { linkStyles } from '../footer/styles'

import { useUpdateViews } from './use-update-views'
import { footerStyles } from './styles'

export function ArticleFooter() {
  const { location } = React.useContext(MetaContext)
  const href = location.href.replace(/\/+$/, '')
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
            href={`https://vk.com/search?c%5Bper_page%5D=40&c%5Bq%5D=${href}&c%5Bsection%5D=statuses`}
            rel="noopener noreferrer"
            target="_blank"
          >VK</a>
          <span>{' · '}</span>
          <a
            css={linkStyles}
            href={`https://www.facebook.com/search/posts/?q=${href}&epa=SERP_TAB`}
            rel="noopener noreferrer"
            target="_blank"
          >FB</a>
          <span>{' · '}</span>
        </div>
      </Container>
    </aside>
  )
}
