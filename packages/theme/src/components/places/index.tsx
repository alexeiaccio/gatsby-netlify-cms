import * as React from 'react'

import * as uuid from 'uuid/v1'
import { useMedia } from 'react-use'

import { Row, Col } from '../row/index'
import { TextContainer } from '../main/index'
import { Container, Wrapper } from '../main/index'
import { PlaceCard } from '../card/place'  
import { Place } from '../../typings/place'

import { sectionStyles, rowStyles } from './styles'

type Props = {
  places: Place[]
  title?: string
}

export function Places({ places, title }: Props) {
  if (places.length === 0) return null

  const items = places as Place[]
  const mdScreen = useMedia('(min-width: 640px)')

  if (mdScreen && (items.length % 2) !== 0) {
    items.push({})
  }
  if (items.length === 0) {
    if (mdScreen) items.push({})
    items.push({})
  }

  return (
    <Wrapper>
      <Container>
        <section css={sectionStyles}>
          {title && (
            <TextContainer>
              <h1>{title}</h1>
            </TextContainer>
          )}
          <Row gap={1} css={rowStyles}>
            {items.map(item => (
              <Col
                key={uuid()}
                gap={1}
                cols={2}
              >
                <PlaceCard data={{...item, internal: true}} />
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </Wrapper>
  )
}
