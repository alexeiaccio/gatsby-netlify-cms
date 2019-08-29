import * as React from 'react'
import { get } from 'lodash'
import * as uuid from 'uuid/v1'

import { translite } from '@krapiva-org/utils'

import { ArticleHeader as ArticleHeaderShape } from '../../typings/article'
import { Img } from '../img/index'
import { Link } from '../link/index'
import { TextContainer } from '../main/index'

import { descriptionStyles, imageStyles, imageWrapperStyles, titleStyles } from './styles'

interface ArticleHeaderProps {
  data: ArticleHeaderShape
}

export function ArticleHeader({ data }: ArticleHeaderProps) {
  const title = get(data, 'data.title.text', '')
  const image = get(data, 'data.image')
  const tags = get(data, 'tags', []).filter(tag => tag.search(/\d/) === -1)
  const date = get(data, 'first_publication_date')
  const authors = get(data, 'data.authors')
  const regExp = /^https?\:\/\/([a-z0-9._%+-]+)\.cdn.prismic/
  const href = get(data, 'href', '')
  const api = get(regExp.exec(href), '1', 'krapiva-dev')

  return (
    <React.Fragment>
      <TextContainer>
        <h1 css={titleStyles}>{title}</h1>
        <div css={descriptionStyles}>
          {tags && tags.map(tag => (
            <Link
              api={api}
              key={uuid()}
              to={translite(tag)}
            >
              <React.Fragment>
                <span> </span>
                {tag}
                <span> ·</span>
              </React.Fragment>
            </Link>
          ))}
          {date && <span> {date} ·</span>}
          {authors && authors.map(({ author }) => author &&
            author.document.map(({ data, fields }) => (
              <Link
                api={api}
                key={uuid()}
                to={fields.slug}
              >
                <React.Fragment>
                  <span> </span>
                  {data.name}
                  <span> ·</span>
                </React.Fragment>
              </Link>
            ))
          )}
        </div>
      </TextContainer>
      <div css={imageWrapperStyles}>
        <div css={imageStyles}>
          <Img src={image} />
        </div>
      </div>
    </React.Fragment>
  )
}