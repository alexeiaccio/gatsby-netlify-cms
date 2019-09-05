import * as React from 'react'
import { get } from 'lodash'

import { Author } from '../../typings/author'
import { Img } from '../img/index'
import { HTML } from '../html/index'
import { TextContainer } from '../main/index'

import { wrapperStyles, imageStyles, imageWrapperStyles, titleStyles } from './styles'

interface CardProps {
  author: Author
}

export function Avatar({ author }: CardProps) {
  const name = get(author, 'data.name')
  const image = get(author, 'data.avatar')
  const statement = get(author, 'data.statement.html')

  return (
    <TextContainer>
      <div css={wrapperStyles}>
        <div css={imageWrapperStyles}>
          <div css={imageStyles}>
            <Img src={image} />
          </div>
        </div>
      </div>
      <h1 css={titleStyles}>{name}</h1>
      {statement && (
        <HTML>
          {statement}
        </HTML>
      )}
    </TextContainer>
  )
}