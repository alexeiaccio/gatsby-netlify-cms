import * as React from 'react'
import { assign } from 'lodash'

import { Article } from '../../typings/article'
import { Container, Wrapper } from '../main/index'

import { ArticleHeader } from './header'
import { ArticleBodyContent } from './body'
import { ArticleFooter } from './footer'

interface ArticleBodyProps {
  data: Article
  onIndex?: boolean
}

export function ArticleBody({ data, onIndex = false }: ArticleBodyProps) {
  if (!data) { return null }

  const { data: bodyData, ...headerKeys } = data
  const { body, ...headerData } = bodyData
  const header = assign(headerKeys, { data: headerData })

  return (
    <React.Fragment>
      <article>
        <ArticleHeader
          data={header}
          onIndex={onIndex}
        />
        <Wrapper>
          <Container>
            <ArticleBodyContent body={body} />
          </Container>
        </Wrapper>
      </article>
      <Wrapper>
        <ArticleFooter onIndex={onIndex} />
      </Wrapper>
    </React.Fragment>
  )
}