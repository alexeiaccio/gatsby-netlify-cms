import * as React from 'react'
import * as uuid from 'uuid/v1'

import { ArticleCard } from '../card/article'
import { Container, TextContainer, Wrapper } from '../main/index'
import { Row, Col } from '../row/index'
import { Article } from '../../typings/article'
import { rowStyles } from './styles'

type Props = Readonly<{
  prev: Article,
  next: Article,
}>

export function PrevNextLinks({ prev, next }: Props) {
  return (
    <Wrapper>
      <Container>
        <TextContainer>
          <h2>Читать дальше</h2>
        </TextContainer>
        <Row gap={1} css={rowStyles}>
          <Col
            key={uuid()}
            gap={1}
            cols={2}
          >
            <ArticleCard data={prev} />
          </Col>
          <Col
            key={uuid()}
            gap={1}
            cols={2}
          >
            <ArticleCard data={next} />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  )
}