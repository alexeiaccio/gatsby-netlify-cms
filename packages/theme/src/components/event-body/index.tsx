import * as React from 'react'
import { get } from 'lodash'
import * as uuid from 'uuid/v1'
import { css } from '@emotion/core'
import tw from 'tailwind.macro'

import { translite } from '@krapiva-org/utils'

import { HTML } from '../html/index'
import { Img } from '../img/index'
import { Container, Wrapper, TextContainer } from '../main/index'
import { Event } from '../../typings/event'
import { Link } from '../link/index'

import { Links } from './links'
import { imageWrapperStyles, descriptionStyles, captionStyles, imageStyles } from './styles'

interface EventBodyProps {
  event: Event
  onClick?: () => void
}

export function EventBody({ event, onClick }: EventBodyProps) {
  if (!event) return null

  const image = get(event, 'data.image')
  const caption = get(event, 'data.caption')
  const eventDescription = get(event, 'data.description.html')
  const tags = get(event, 'tags', []).filter(tag => tag.search(/\d/) === -1)
  const dateStart = get(event, 'data.start')
  const startTime = get(event, 'data.starttime')
  const dateEnd = get(event, 'data.end')
  const places = get(event, 'data.places')
  const links = get(event, 'data.links')
  let date = dateStart
  if (dateStart !== dateEnd && dateEnd) {
    date = `${dateStart}—${dateEnd}`
  }

  const renderDescription = () => (
    <div css={descriptionStyles}>
      {tags && tags.map(tag => (
        <React.Fragment key={uuid()}>
          <span> </span>
          <Link
            key={uuid()}
            to={`/${translite(tag)}`}
            internal
          >
            {tag}
          </Link>
          <span> ·</span>
        </React.Fragment>
      ))}
      {date && <span> {date} ·</span>}
      {places && places.map(({ place }) => place &&
        place.document.map(({ data, fields }) => (
          <React.Fragment key={uuid()}>
            <span> </span>
            <Link
              key={uuid()}
              to={`/${fields.slug}`}
              internal
            >
              {data.title.text}
            </Link>
            <span> ·</span>
          </React.Fragment>
        ))
      )}
      {startTime && <span> Начало в {startTime} ·</span>}
    </div>
  )

  return (
    <Wrapper>
      <Container>
        <div
          css={css`
            ${imageWrapperStyles};
            ${onClick && tw`cursor-pointer`};
          `}
          onClick={onClick}
        >
          <div css={imageStyles}>
            <Img src={image} />
          </div>
          {caption && (
            <div css={captionStyles}>
              <HTML>{caption.html}</HTML>
            </div>
          )}
        </div>
        <TextContainer>
          <h1>{event.data.title.text}</h1>
          { renderDescription() }
          {eventDescription && <HTML>{eventDescription}</HTML>}
          <Links items={links} />
        </TextContainer>
      </Container>
    </Wrapper>
  )
}
