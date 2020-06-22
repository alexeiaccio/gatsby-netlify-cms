import * as React from 'react'
import { get } from 'lodash'
import * as uuid from 'uuid/v1'
// import { useMedia } from 'react-use'

import { translite } from '@krapiva-org/utils'

import { Article } from '../../typings/article'
import { HTML } from '../html/index'
import { Img } from '../img/index'
import { Link } from '../link/index'
import { TextContainer } from '../main/index'

// import { Views } from './views'
// import { useGetViews } from './use-get-views'
import { Header, descriptionStyles, captionStyles, imageWrapperStyles, titleStyles } from './styles'

interface ArticleHeaderProps {
  data: Article
  onIndex?: boolean
}

export function ArticleHeader({ data, onIndex = false }: ArticleHeaderProps) {
  const title = get(data, 'data.title.text', '')
  const image = get(data, 'data.image')
  const caption = get(data, 'data.caption')
  const tags = get(data, 'tags', []).filter(tag => tag.search(/\d/) === -1)
  const date = get(data, 'first_publication_date')
  const authors = get(data, 'data.authors')
  // const isBlackTheme = useMedia('(prefers-color-scheme: dark)')

  // useGetViews()

  return (
    <Header
      white={onIndex}
      image={image}
    >
      <TextContainer>
        <h1 css={titleStyles}>{title}</h1>
        <div css={descriptionStyles}>
          {tags && tags.map(tag => (
            <Link
              key={uuid()}
              to={`/${translite(tag)}`}
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
                key={uuid()}
                to={`/${fields.slug}`}
              >
                <React.Fragment>
                  <span> </span>
                  {data.name}
                  <span> ·</span>
                </React.Fragment>
              </Link>
            ))
          )}
          {/* <Views onIndex={onIndex && !isBlackTheme} /> */}
        </div>
      </TextContainer>
      <div css={imageWrapperStyles}>
        <Img src={image} />
        {caption && (
          <div css={captionStyles}>
            <HTML>{caption.html}</HTML>
          </div>
        )}
      </div>
    </Header>
  )
}