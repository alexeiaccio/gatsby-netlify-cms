import * as React from 'react'
import { assign } from 'lodash'

import { Article } from '../../typings/article'
import { ArticleBodyContent } from '../article-body/body'
import { ArticleCard } from '../card/article'
import { Col } from '../row/index'

type Props = Readonly<{
  active: boolean
  data: Article
  onClick: () => void
}>

export function AfishaItem({ active, data, onClick }: Props) {
  const { data: bodyData, fields, ...headerKeys } = data
  const { body, ...headerData } = bodyData
  const header = assign(headerKeys, { data: headerData })
 
  if (active) {
    return (
      <Col
        id={fields.slug}
        gap={1}
        cols={1}
      >
        <ArticleCard data={header} onClick={onClick} />
        <ArticleBodyContent body={body} />
      </Col>
    )
  }

  return (
    <Col
      id={fields.slug}
      gap={1}
      cols={2}
    >
      <ArticleCard data={header} onClick={onClick} />
    </Col>
  )
}