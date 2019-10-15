import * as React from 'react'

import { Article } from '../../typings/article'
import { Container, Wrapper } from '../main/index'

import { Search } from './search'

interface SearchBodyProps {
  articles: Article[]
}

export function SearchBody({ articles }: SearchBodyProps) {
  return (
    <Wrapper>
      <Container>
        <Search articles={articles} />
      </Container>
    </Wrapper>
  )
}
