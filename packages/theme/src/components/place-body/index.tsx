import * as React from 'react'

import { Place } from '../../typings/place'
import { TextContainer } from '../main/index'
import { Container, Wrapper } from '../main/index'

// import { sectionStyles, rowStyles } from './styles'

interface PlaceBodyProps {
  place: Place
}

export function PlaceBody({ place }: PlaceBodyProps) {

  console.log(place)

  return (
    <Wrapper>
      <Container>
        <TextContainer>
          <h1>{place.data.title.text}</h1>
        </TextContainer>
      </Container>
    </Wrapper>
  )
}
