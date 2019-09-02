import * as React from 'react'
import { get, groupBy } from 'lodash'

import { About } from '../../typings/about'
import { Author } from '../../typings/author'
import { Container, Wrapper, TextContainer } from '../main/index'

import { AboutBodyContent } from './body'
import { AuthorsList } from './authors'

interface AboutBodyProps {
  about: About
  authors: Author[]
}

export function AboutBody({ about, authors }: AboutBodyProps) {
  const title = get(about, 'title.text', '')
  const body = get(about, 'body')
  const groups = groupBy(authors, 'data.type')
  const redsovet = get(groups, 'redsovet')
  const restAuthors = get(groups, 'author')

  return (
    <article>
      <Wrapper>
        <Container>
          <TextContainer>
            <h1>{title}</h1>
          </TextContainer>
          <AboutBodyContent body={body} />
          {redsovet && (
            <AuthorsList
              title="Редсовет"
              items={redsovet} />
          )}
          {redsovet && (
            <AuthorsList
              title="Авторы"
              items={restAuthors}
            />
          )}
        </Container>
      </Wrapper>
    </article>
  )
}