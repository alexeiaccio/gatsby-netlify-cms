import * as React from 'react'
import {
  compact, filter, find, flatMap, flowRight,
  get, map, some, uniq, uniqBy,
} from 'lodash/fp'
import { useMedia } from 'react-use'

import { sortArticlesByDate } from '../../utils/sort-by-date'
import { ArticleCard } from '../card/article'
import { Row, Col } from '../row/index'
import { Button } from '../button/index'

import { Article } from '../../typings/article'
import { TextContainer } from '../main/index'

import { Filters } from './filters'
import { Matched } from './matched'
import { searchStyles, Input, sectionStyles, rowStyles, buttonStyles } from './styles'

interface SearchProps {
  articles: Article[]
}

export function Search({ articles }: SearchProps) {
  const [queryState, setQuery] = React.useState('')
  const [results, setResult] = React.useState<any[]>([])
  const [page, setPage] = React.useState<number>(1)
  const [activeFilter, setFilter] = React.useState<string | null>(null)
  const mdScreen = useMedia('(min-width: 640px)')

  const inputRef = React.useRef<any>(null)

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

  const prepared = React.useMemo(() => articles.map(article => {
    if (!article) return null

    const { fields, ...item } = article

    return some(tag => tag === 'Афиша', item.tags) ? {
      ...item,
      fields: {
        slug: `arhiv-afishi#${fields.slug}`,
      },
      internal: true,
    } : article
  }), [])
  const tags = React.useMemo(() => flowRight([
    uniq,
    compact,
    flatMap('tags'),
  ])(prepared), [])
  const authors = React.useMemo(() => flowRight([
    map('name'),
    uniqBy('name'),
    map(get('author.document.0.data')),
    filter('author'),
    flatMap('data.authors'),
  ])(prepared), [])
  const filtersList = map(filter => ({ name: filter, active: filter === activeFilter }),
    [...tags, ...authors])
  let items = map(article => ({ article, result: null }), prepared)
  let filtered = null

  if (activeFilter) {
    if (page > 1) setPage(1)
    filtered = filter(article =>
      find(tag => tag === activeFilter, article.tags) ||
      find(name => name === activeFilter,
        map(get('author.document.0.data.name'), filter('author', article.data.authors))),
      prepared)
    items = map(article => ({
      article,
      result: null,
    }), filtered)
  }

  if (queryState.length > 0 || results.length > 0) {
    if (page > 1) setPage(1)
    items = filter('result', map(article => {
      const result = find(['slug', article.fields.slug], results);
      return result ? ({
        article,
        result,
      }) : ({ article: null, result: null })
    }, filtered || prepared))
  }

  if (mdScreen && (items.length % 2) !== 0) {
    items.push({})
  }
  if (items.length === 0) {
    if (mdScreen) items.push({})
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
        <Filters
          collapsed={queryState.length > 0 || results.length > 0}
          items={filtersList}
          onClick={handleFilter}
        />
      </TextContainer>
      <section css={sectionStyles}>
        <Row gap={1} css={rowStyles}>
          {items
            .sort(sortArticlesByDate)
            .slice(0, page * 12)
            .map((item, idx) => (
              <Col
                key={get('href', item) || `result-${idx}`}
                gap={1}
                cols={2}
              >
                <ArticleCard data={item.article}>
                  <Matched query={queryState} result={item.result} />
                </ArticleCard>
              </Col>
            ))}
        </Row>
      </section>
      {(items.slice(page * 12).length > 0) && (
        <div css={buttonStyles}>
          <Button
            color="#08a676"
            inverted
            rounded={0.25}
            size={1}
            onClick={() => setPage(current => current + 1)}
          >
            <span>
              Ещё ↓
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}
