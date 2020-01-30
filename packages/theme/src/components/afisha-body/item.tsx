import * as React from 'react'
import { assign } from 'lodash'

import { Event } from '../../typings/event'
import { EventBody } from '../event-body/index'
import { EventCard } from '../card/event'
import { Col } from '../row/index'

type Props = Readonly<{
  active: boolean
  data: Event
  onClick: () => void
}>

export function AfishaItem({ active, data, onClick }: Props) {
  const { data: bodyData, fields, ...headerKeys } = data
  const header = assign(headerKeys, { data: bodyData })
 
  if (active) {
    return (
      <Col
        id={fields.slug}
        gap={1}
        cols={1}
      >
        <EventBody event={data} onClick={onClick} />
      </Col>
    )
  }

  return (
    <Col
      id={fields.slug}
      gap={1}
      cols={2}
    >
      <EventCard data={header} onClick={onClick} />
    </Col>
  )
}