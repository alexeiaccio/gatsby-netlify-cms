import * as React from 'react'
import { assign } from 'lodash'

import { Article } from '../../typings/article'
import { Container, Wrapper } from '../main/index'

import { ArticleHeader } from './header'
import { ArticleBodyContent } from './body'
import { ArticleFooter } from './footer'

interface ArticleBodyProps {
  data: Article
}

export function ArticleBody({ data }: ArticleBodyProps) {
  const { data: bodyData, ...headerKeys } = data
  const { body, ...headerData } = bodyData
  const header = assign(headerKeys, { data: headerData })

  return (
    <React.Fragment>
      <article>
        <ArticleHeader data={header} />
        <Wrapper>
          <Container>
            <ArticleBodyContent body={body} />
          </Container>
        </Wrapper>
      </article>
      <Wrapper>
        <ArticleFooter />
      </Wrapper>
    </React.Fragment>
  )
}