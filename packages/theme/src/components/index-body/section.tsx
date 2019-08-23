import * as React from 'react'
import * as uuid from 'uuid/v1'

import { Card } from '../card/index'
import { HTML } from '../html/index'
import { Row, Col } from '../row/index'
import { TextContainer } from '../main/index'
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
  const items = data.articles.slice(0, 4)

  if ((items.length % 2) !== 0) {
    items.push({})
  }
  if (items.length === 0) {
    items.push({})
    items.push({})
  }

  return (
    <section css={sectionStyles}>
      <TextContainer>
        <h2 id={data.id}>{data.title}</h2>
        {data.description && (
          <HTML>{data.description}</HTML>
        )}
      </TextContainer>
      <Row gap={1} css={rowStyles}>
        {items.map(item => (
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
