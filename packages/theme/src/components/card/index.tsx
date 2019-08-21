import * as React from 'react'
import { get } from 'lodash'

import { ArticleHeader } from '../../typings/article'
import { Img, ImgProps } from '../img/index'
import { cardStyles, imageStyles, imageWrapperStyles, titleStyles } from './styles'

interface CardProps {
  data: ArticleHeader
  image: ImgProps
}

export function Card({ data }: CardProps) {
  const title = get(data, 'data.title.text', '')
  const image = get(data, 'data.image')

  return (
    <div css={cardStyles}>
      <div css={imageWrapperStyles}>
        <div css={imageStyles}>
          <Img src={image} />
        </div>
      </div>
      <h3 css={titleStyles}>{title}</h3>
    </div>
  )
}