import * as React from 'react'
import * as uuid from 'uuid/v1'

import { Author } from '../../typings/author'
import { Article } from '../../typings/article'
import { Container, Wrapper } from '../main/index'
import { ArticleCard } from '../card/article'
import { Row, Col } from '../row/index'

import { Avatar } from './avatar'
import { rowStyles } from './styles'

interface AuthorBodyProps {
  author: Author
  articles: Article[]
}

export function AuthorBody({ author, articles }: AuthorBodyProps) {
  return (
    <React.Fragment>
      <Wrapper>
        <Container>
          <Avatar author={author} />
          <Row gap={1} css={rowStyles}>
            {articles.map(item => (
              <Col
                key={uuid()}
                gap={1}
                cols={2}
              >
                <ArticleCard data={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </Wrapper>
    </React.Fragment>
  )
}