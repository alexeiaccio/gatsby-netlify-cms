import * as React from 'react'
import * as uuid from 'uuid/v1'

import { Article } from '../../../typings/article'
import { Card } from '../../card/index'
import { Row, Col } from '../../row/index'

import { rowStyles } from './styles'

interface ArticlesListProps {
  articles: Article[]
}

export function ArticlesList({ articles }: ArticlesListProps) {
  if (!articles) { return null }
  return (
    <Row gap={1} css={rowStyles}>
      {articles.map(item => (
        <Col
          key={uuid()}
          gap={1}
          cols={2}
        >
          <Card data={item} />
        </Col>
      ))}
    </Row>
  )
}
