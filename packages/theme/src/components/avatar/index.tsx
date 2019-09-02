import * as React from 'react'
import { get } from 'lodash'

import { Author } from '../../typings/author'
import { Img } from '../img/index'
import { Link } from '../link/index'
import { HTML } from '../html/index'

import { cardStyles, descriptionStyles, imageStyles, imageWrapperStyles, titleStyles } from './styles'

interface CardProps {
  author: Author
}

export function Avatar({ author }: CardProps) {
  const name = get(author, 'data.name')
  const image = get(author, 'data.avatar')
  const statement = get(author, 'data.statement.html')

  return (
    <Link
      css={cardStyles}
      to={get(author, 'fields.slug')}
    >
      <React.Fragment>
        <div css={imageWrapperStyles}>
          <div css={imageStyles}>
            <Img src={image} />
          </div>
        </div>
        <h3 css={titleStyles}>{name}</h3>
        {statement && (
          <div css={descriptionStyles}>
            <HTML>
              {statement}
            </HTML>
          </div>
        )}
      </React.Fragment>
    </Link>
  )
}