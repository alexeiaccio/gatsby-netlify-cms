import * as React from 'react'
import { get } from 'lodash'
import * as uuid from 'uuid/v1'

import { Article } from '../../typings/article'
import { Img } from '../img/index'
import { Link } from '../link/index'

import { cardStyles, descriptionStyles, imageStyles, imageWrapperStyles, titleStyles } from './styles'

interface CardProps {
  data: Article
}

export function Card({ data }: CardProps) {
  const title = get(data, 'data.title.text', '')
  const image = get(data, 'data.image')
  const tags = get(data, 'tags', []).filter(tag => tag.search(/\d/) === -1)
  const date = get(data, 'first_publication_date')
  const authors = get(data, 'data.authors')
  const regExp = /^https?\:\/\/([a-z0-9._%+-]+)\.cdn.prismic/
  const href = get(data, 'href', '')
  const api = get(regExp.exec(href), '1')

  const renderContent = () => (
    <React.Fragment>
      <div css={imageWrapperStyles}>
        <div css={imageStyles}>
          <Img src={image} />
        </div>
      </div>
      <h3 css={titleStyles}>{title}</h3>
      <div css={descriptionStyles}>
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
      </div>
    </React.Fragment>
  )

  return get(data, 'fields.slug') ? (
    <Link
      css={cardStyles}
      api={api}
      to={`/${get(data, 'fields.slug')}`}
    >
      {renderContent()}
    </Link>
  ) : (
      <div css={cardStyles}>
        {renderContent()}
      </div>
    )
}