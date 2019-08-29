import * as React from 'react'
import { pick, assign } from 'lodash'

import { ArticleHeader as HeaderProps, ArticleBody as ArticleProps } from '../../typings/article'

import { ArticleHeader } from './header'

interface ArticleBodyProps {
  data: HeaderProps | ArticleProps
}

export function ArticleBody({ data }: ArticleBodyProps) {
  const headerKeys = pick(data, ['href', 'tags', 'first_publication_date'])
  const headerData = pick(data.data, ['image', 'title', 'authors'])
  const header = assign(headerKeys, { data: headerData })

  return (
    <article>
      <ArticleHeader data={header} />
    </article>
  )
}