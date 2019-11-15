import * as React from 'react'
import { get } from 'lodash'
import * as uuid from 'uuid/v1'

import { translite } from '@krapiva-org/utils'

import { HTML } from '../html/index'
import { Img } from '../img/index'
import { Link } from '../link/index'
import { Event } from '../../typings/event'
import { Place } from '../../typings/place'
import { AfishaBody } from '../afisha-body/index'
import { TextContainer } from '../main/index'
import { Container, Wrapper } from '../main/index'
import { Links } from '../event-body/links'

import { descriptionStyles, captionStyles, imageWrapperStyles, titleStyles } from './styles'


interface PlaceBodyProps {
  place: Place
  events: Event[]
  location: any
}

export function PlaceBody({ place, events, location }: PlaceBodyProps) {
  const title = get(place, 'data.title.text', '')
  const placeDescription = get(place, 'data.description.html')
  const image = get(place, 'data.image')
  const address = get(place, 'data.address')
  const links = get(place, 'data.links')
  const caption = get(place, 'data.caption')
  const tags = get(place, 'tags', [])

  return (
    <Wrapper>
      <Container>
        <TextContainer>
          <h1 css={titleStyles}>{title}</h1>
          <div css={descriptionStyles}>
            {tags && tags.map(tag => (
              <React.Fragment>
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
            <span> </span>
            <span>{address}</span>
            <span> ·</span>
          </div>
        </TextContainer>
        <div css={imageWrapperStyles}>
          <Img src={image} />
          {caption && (
            <div css={captionStyles}>
              <HTML>{caption.html}</HTML>
            </div>
          )}
        </div>
        <TextContainer>
          <HTML>{placeDescription}</HTML>
          <Links items={links} />
        </TextContainer>
      </Container>
      <AfishaBody
        events={events}
        title={'События'}
        location={location}
      />
    </Wrapper>
  )
}
