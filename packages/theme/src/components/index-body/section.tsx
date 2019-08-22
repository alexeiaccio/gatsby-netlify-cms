import * as React from 'react'
import * as uuid from 'uuid/v1'

import { Card } from '../card/index'
import { HTML } from '../html/index'
import { Row, Col } from '../row/index'
import { sectionStyles, rowStyles } from './styles'

interface SectionProps {
  key: string
  data: {
    id: string
    description: string
    title: string
    articles: any[]
  }
}

export function IndexSection({ data }: SectionProps) {
  return (
    <section css={sectionStyles}>
      <h2 id={data.id}>{data.title}</h2>
      {data.description && (
        <HTML>{data.description}</HTML>
      )}
      <Row gap={1} css={rowStyles}>
        {data.articles.map(item => (
          <Col
            key={uuid()}
            gap={1}
            cols={2}
          >
            <Card data={item} />
          </Col>
        ))}
      </Row>
    </section>
  )
}
