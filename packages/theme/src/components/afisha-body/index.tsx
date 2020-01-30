import * as React from 'react'
import { navigate } from '@reach/router'
import {
  compact, filter, find, flatMap, flowRight, map, uniq, sortBy, get,
} from 'lodash/fp'

import { translite } from '@krapiva-org/utils'

import { Event } from '../../typings/event'
import { Button } from '../button/index'
import { Row } from '../row/index'
import { TextContainer } from '../main/index'
import { Container, Wrapper } from '../main/index'
import { Filters } from '../filters/index'

import { AfishaItem } from './item'
import { isInFuture, isSameDay, formatDate } from './lib'
import { sectionStyles, rowStyles, buttonStyles } from './styles'

interface AfishaBodyProps {
  events: Event[]
  title: string
  location: any
}

export function AfishaBody({ events, title, location }: AfishaBodyProps) {
  if (events.length === 0) return null

  const [activeFilter, setFilter] = React.useState<string | null>(null)
  const [page, setPage] = React.useState<number>(1)
  const [active, setActive] = React.useState<string | null>(null)

  const handleFilter = (current) => {
    setFilter(current)
    setActive(null)
  }
  const handleClick = (slug) => {
    setActive(active === slug ? null : slug)
    navigate(`#${slug}`, { replace: true })
  }

  React.useEffect(() => {
    const { hash } = location
    if (hash) {
      setActive(hash.replace('#', ''))
      navigate(hash, { replace: true })
    }
  }, [])

  const dates = React.useMemo(() => flowRight([
    map(date => ({ name: formatDate(date), date })),
    sortBy([]),
    filter(isInFuture),
    uniq,
    compact,
    flatMap('data.startDate'),
  ])(events), [])
  const tags = React.useMemo(() => flowRight([
    filter(tag => translite(tag) !== location.pathname.replace('/', '')),
    uniq,
    compact,
    flatMap('tags'),
  ])(events), [])
  const filtersList = React.useMemo(() => map(filter => ({ name: filter, active: filter === activeFilter }),
    [...map('name', dates), ...tags]), [activeFilter])
  let items = events as Event[]
  if (activeFilter) {
    if (page > 1) setPage(1)
    items = filter(event =>
      find(tag => tag === activeFilter, event.tags) ||
      isSameDay(event.data.startDate, get('date', find(['name', activeFilter], dates))),
      items)
  }

  return (
    <Wrapper>
      <Container>
        <TextContainer>
          <h1>{title}</h1>
          <Filters
            collapsed={!!activeFilter}
            items={filtersList}
            onClick={handleFilter}
          />
        </TextContainer>
        <section css={sectionStyles}>
          <Row gap={1} css={rowStyles}>
            {items.slice(0, page * 12).map(item => (
              <AfishaItem
                key={item.fields.slug}
                active={active === item.fields.slug}
                data={item}
                onClick={() => handleClick(item.fields.slug)}
              />
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
      </Container>
    </Wrapper>
  )
}
