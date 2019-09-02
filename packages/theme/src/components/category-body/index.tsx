import * as React from './react'
import * as uuid from 'uuid/v1'

import { Article } from '../../typings/article'
import { Card } from '../card/index'
import { Row, Col } from '../row/index'
import { TextContainer } from '../main/index'
import { Container, Wrapper } from '../main/index'

import { sectionStyles, rowStyles } from './styles'

interface CategoryBodyProps {
  articles: Article[]
  title: string
}

export function CategoryBody({ articles, title }: CategoryBodyProps) {
  return (
    <Wrapper>
      <Container>
        <section css={sectionStyles}>
          <TextContainer>
            <h1>{title}</h1>
          </TextContainer>
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
        </section>
      </Container>
    </Wrapper>
  )
}
