import * as React from 'react'
import { get } from 'lodash'
import * as uuid from 'uuid/v1'

import { Article } from '../../typings/article'

import { BaseCard } from './index'

interface CardProps {
  data: Article
  children?: JSX.Element | null
  onClick?: () => void
}

export function ArticleCard({ data, children, onClick }: CardProps) {
  const tags = get(data, 'tags', []).filter(tag => tag.search(/\d/) === -1)
  const date = get(data, 'data.releasedate') || get(data, 'first_publication_date')
  const authors = get(data, 'data.authors')

  const renderDescription = () => (
    <React.Fragment>
      {tags && tags.map(tag => (
        <React.Fragment key={uuid()}>
          <span> </span>
          {tag}
          <span> ·</span>
        </React.Fragment>
      ))}
      {date && <span> {date} ·</span>}
      {authors && authors.map(({ author }) => author &&
        author.document.map(({ data }) => (
          <React.Fragment key={uuid()}>
            <span> </span>
            {data.name}
            <span> ·</span>
          </React.Fragment>
        ))
      )}
    </React.Fragment>
  )

  return (
    <BaseCard
      data={data}
      onClick={onClick}
      renderDescription={renderDescription}
    >
      {children}
    </BaseCard>
  )
}
