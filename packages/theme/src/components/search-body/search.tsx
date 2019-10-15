import * as React from 'react'
import { compact, filter, find, flatMap, flowRight, get, map, uniq, uniqBy } from 'lodash/fp'

import { Card } from '../card/index'
import { Row, Col } from '../row/index'

import { Article } from '../../typings/article'
import { TextContainer } from '../main/index'

import { Filters } from './filters'
import { Matched } from './matched'
import { searchStyles, Input, sectionStyles, rowStyles } from './styles'

interface SearchProps {
  articles: Article[]
}

export function Search({ articles }: SearchProps) {
  const [queryState, setQuery] = React.useState('')
  const [results, setResult] = React.useState<any[]>([])
  const [activeFilter, setFilter] = React.useState<string | null>(null)

  const inputRef = React.useRef<any>(null)
  // console.log(location)

  React.useEffect(() => {
    if (inputRef.current && inputRef.current.focus) {
      inputRef.current.focus()
    }
  }, [])

  const getSearchResults = query => {
    if (!query || window === undefined || !window.__LUNR__) {
      return []
    }
    const lunrIndexRu = window.__LUNR__.ru
    const lunrIndexEn = window.__LUNR__.en

    if (!lunrIndexRu || !lunrIndexEn) {
      return []
    }

    const resultsRu = lunrIndexRu.index.search(query)
    const resultsEn = lunrIndexEn.index.search(query)
    const resRu = resultsRu.map(({ ref }) => lunrIndexRu.store[ref])

    if (resRu.length) {
      return resRu
    }

    return resultsEn.map(({ ref }) => lunrIndexEn.store[ref])
  }
  const search = event => {
    const query = event.target.value.toLowerCase()
    setQuery(query)
    setResult(getSearchResults(query))
  }

  const handleFilter = (current) => {
    setFilter(current)
  }

  const tags = React.useMemo(() => flowRight([
    uniq,
    compact,
    flatMap('tags'),
  ])(articles), [])
  const authors = React.useMemo(() => flowRight([
    map('name'),
    uniqBy('name'),
    map(get('author.document.0.data')),
    filter('author'),
    flatMap('data.authors'),
  ])(articles), [])
  const filtersList = map(filter => ({ name: filter, active: filter === activeFilter}),
    [...tags, ...authors])
  let items = map(article => ({ article, result: null }), articles)
  let filtered = null

  if (activeFilter) {
    // if (queryState.length > 0) setQuery('')
    // if (results.length > 0) setResult([])
    filtered = filter(article =>
      find(tag => tag === activeFilter, article.tags) ||
      find(name => name === activeFilter,
        map(get('author.document.0.data.name'), filter('author', article.data.authors))),
      articles)
    items = map(article => ({
      article,
      result : null,
    }), filtered)
  }

  if (queryState.length > 0 || results.length > 0) {
    items = filter('result', map(article => {
      const result = find(['slug', article.fields.slug], results);
      return result ? ({
        article,
        result,
      }) : ({ article: null, result: null })
    }, filtered || articles))
  }

  if ((items.length % 2) !== 0) {
    items.push({})
  }
  if (items.length === 0) {
    items.push({})
    items.push({})
  }

  return (
    <div css={searchStyles}>
      <TextContainer>
        <Input
          onChange={search}
          placeholder="Начните поиск..."
          ref={inputRef}
          type="search"
          value={queryState}
        />
        <Filters items={filtersList} onClick={handleFilter} />
      </TextContainer>
      <section css={sectionStyles}>
        <Row gap={1} css={rowStyles}>
          {items.slice(0, 12).map((item, idx) => (
            <Col
              key={get('href', item) || `result-${idx}`}
              gap={1}
              cols={2}
            >
              <Card data={item.article} />
              <Matched query={queryState} result={item.result} />
            </Col>
          ))}
        </Row>
      </section>
    </div>
  )
}
