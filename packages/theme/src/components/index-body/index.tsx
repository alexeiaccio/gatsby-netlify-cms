import * as React from 'react'
import { get } from 'lodash'
import * as uuid from 'uuid/v1'

import { translite } from '@krapiva-org/utils/src/make-path'
import { MENU } from '@krapiva-org/utils/defaults/menu'

import { MetaContext } from '../layout/index'
import { IndexSection } from './section'

interface IndexBodyProps {
  articles: any[]
  about: any
}

export function IndexBody({ articles, about }: IndexBodyProps) {
  const { index } = React.useContext(MetaContext)
  const getArticles = title => articles.filter(article => article.tags.some(tag => tag === title))
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
    articles: articles.slice(0, 7),
  }))
  const after = MENU.after.map(item => ({
    id: item.link,
    description: null,
    title: item.text,
    articles: [],
    about,
  }))
  const sections = [...before, ...items, ...after];

  return (
    <React.Fragment>
      {sections.map(item => (
        <IndexSection
          key={uuid()}
          data={item}
        />
      ))}
    </React.Fragment>
  )
}
