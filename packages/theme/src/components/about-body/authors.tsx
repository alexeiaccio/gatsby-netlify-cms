import * as React from 'react'
import * as uuid from 'uuid/v1'

import { Author } from '../../typings/author'
import { Avatar } from '../avatar/index'
import { Row, Col } from '../row/index'
import { TextContainer } from '../main/index'

import { rowStyles } from './styles'

interface AuthorsListProps {
  items: Author[]
  title: string
}

export function AuthorsList({ items, title }: AuthorsListProps) {
  return (
    <React.Fragment>
      <TextContainer>
        <h2>{title}</h2>
      </TextContainer>
      <Row gap={1} css={rowStyles}>
        {items.map(item => (
          <Col
            key={uuid()}
            gap={1}
            cols={3}
          >
            <Avatar author={item} />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  )
}
