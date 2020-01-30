import * as React from 'react'
import { get } from 'lodash'
import * as uuid from 'uuid/v1'

import { Event } from '../../typings/event'

import { BaseCard } from './index'

interface CardProps {
  data: Event
  children?: JSX.Element | null
  onClick?: () => void
}

export function EventCard({ data, children, onClick }: CardProps) {
  const tags = get(data, 'tags', []).filter(tag => tag.search(/\d/) === -1)
  const dateStart = get(data, 'data.start')
  const startTime = get(data, 'data.starttime')
  const dateEnd = get(data, 'data.end')
  const places = get(data, 'data.places')
  let date = dateStart
  if (dateStart !== dateEnd && dateEnd) {
    date = `${dateStart}—${dateEnd}`
  }

  const renderDescription = () => (
    <React.Fragment>
      {tags && tags.map(tag => (
        <React.Fragment key={uuid()}>
          <span> </span>
          {tag}
          <span> ·</span>
        </React.Fragment>
      ))}
      {date && <span> {date} ·</span>}
      {places && places.map(({ place }) => place &&
        place.document.map(({ data }) => (
          <React.Fragment key={uuid()}>
            <span> </span>
            {data.title.text}
            <span> ·</span>
          </React.Fragment>
        ))
      )}
      {startTime && <span> Начало в {startTime} ·</span>}
    </React.Fragment>
  )

  return (
    <BaseCard
      data={data}
      onClick={onClick}
      renderDescription={renderDescription}
    >
      {children}
    </BaseCard>
  )
}
