import * as React from 'react'
import * as uuid from 'uuid/v1'
import { useMedia } from 'react-use'

import { sortArticlesByDate } from '../../utils/sort-by-date'
import { Article } from '../../typings/article'
import { ArticleCard } from '../card/article'
import { Row, Col } from '../row/index'
import { TextContainer } from '../main/index'
import { Container, Wrapper } from '../main/index'

import { sectionStyles, rowStyles } from './styles'

interface CategoryBodyProps {
  articles: Article[]
  title?: string
}

export function CategoryBody({ articles, title }: CategoryBodyProps) {
  const items: Array<Article> = articles.sort(sortArticlesByDate)
  const mdScreen = useMedia('(min-width: 640px)')

  if (mdScreen && (items.length % 2) !== 0) {
    items.push({})
  }
  if (items.length === 0) {
    if (mdScreen) items.push({})
    items.push({})
  }

  return (
    <Wrapper>
      <Container>
        <section css={sectionStyles}>
          {title && (
            <TextContainer>
              <h1>{title}</h1>
            </TextContainer>
          )}
          <Row gap={1} css={rowStyles}>
            {items.map(item => (
              <Col
                key={uuid()}
                gap={1}
                cols={2}
              >
                <ArticleCard data={item} />
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </Wrapper>
  )
}
