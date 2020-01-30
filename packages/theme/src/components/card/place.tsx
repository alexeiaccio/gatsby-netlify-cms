import * as React from 'react'
import { get } from 'lodash'
import * as uuid from 'uuid/v1'

import { Place } from '../../typings/place'

import { BaseCard } from './index'

interface CardProps {
  data: Place
  children?: JSX.Element | null
  onClick?: () => void
}

export function PlaceCard({ data, children, onClick }: CardProps) {
  const tags = get(data, 'tags', []).filter(tag => tag.search(/\d/) === -1)
  const address = get(data, 'data.address')

  const renderDescription = () => (
    <React.Fragment>
      {tags && tags.map(tag => (
        <React.Fragment key={uuid()}>
          <span> </span>
          {tag}
          <span> ·</span>
        </React.Fragment>
      ))}
      <span> </span>
      <span>{address}</span>
      <span> ·</span>
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
