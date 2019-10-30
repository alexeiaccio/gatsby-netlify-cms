import * as React from 'react'
import { get, filter } from 'lodash'
import * as uuid from 'uuid/v1'
import * as moment from 'moment'

import { translite, MENU } from '@krapiva-org/utils'

import { MetaContext } from '../layout/index'
import { Container, Wrapper } from '../main/index'
import { Highlights } from './highlights'
import { IndexSection } from './section'

interface IndexBodyProps {
  articles: any[]
  about: any
}

export function IndexBody({ articles, about }: IndexBodyProps) {
  const { index } = React.useContext(MetaContext)
  const getArticles = title => articles.filter(article => article.tags.some(tag => (tag === title)))
  const items = get(index, 'categories', [])
    .map(item => item ? ({
      id: translite(item.categorytitle.text),
      description: item.categorydescription.html,
      title: item.categorytitle.text,
      articles: getArticles(item.categorytitle.text),
    }) : null)
  const before = MENU.before.map(item => ({
    id: item.link,
    description: null,
    title: item.text,
    articles: articles
      .filter(article => article.tags.some(tag => (tag !== 'Архив')))
      .slice(0, 7),
  }))
  const after = MENU.after.filter(({ link }) => !link.includes('poisk')).map(item => ({
    id: item.link,
    description: null,
    title: item.text,
    articles: [],
    about,
  }))
  const sections = [...before, ...items, ...after];
  const highlights = filter(get(index, 'body'),
    item => (get(item, '__typename') === 'PrismicIndexBodyHighlight'
      && moment(item.primary.expiredate).diff(moment(), 'days') >= 0))

  return (
    <Wrapper>
      <Highlights highlights={highlights} />
      <Container>
        {sections.map(item => (
          <IndexSection
            key={uuid()}
            data={item}
          />
        ))}
      </Container>
    </Wrapper>
  )
}
