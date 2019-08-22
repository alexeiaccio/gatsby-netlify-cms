import * as React from 'react'
import { get } from 'lodash'
import * as uuid from 'uuid/v1'

import { translite } from '@krapiva-org/utils/src/make-path'

import { MetaContext } from '../layout/index'
import { IndexSection } from './section'

interface IndexBodyProps {
  articles: any[]
}

export function IndexBody({ articles }: IndexBodyProps) {
  const { index } = React.useContext(MetaContext)
  const getArticles = title => articles.filter(article => article.tags.some(tag => tag === title))
  const items = get(index, 'categories', [])
    .map(item => item ? ({
      id: translite(item.categorytitle.text),
      description: item.categorydescription.html,
      title: item.categorytitle.text,
      articles: getArticles(item.categorytitle.text),
    }) : null)

  return (
    <React.Fragment>
      {items.map(item => (
        <IndexSection
          key={uuid()}
          data={item}
        />
      ))}
    </React.Fragment>
  )
}
