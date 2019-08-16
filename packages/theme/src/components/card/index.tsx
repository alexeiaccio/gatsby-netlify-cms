import * as React from 'react'
import { get } from 'lodash'

import { ArticleHeader } from '../../typings/article'
import { ImgHolder } from '../img/holder'
import { cardStyles, titleStyles } from './styles'

interface CardProps {
  data: ArticleHeader
}

export function Card({ data }: CardProps) {
  const title = get(data, 'data.title.text', '')

  return (
    <div css={cardStyles}>
      <ImgHolder />
      <h3 css={titleStyles}>{title}</h3>
    </div>
  )
}