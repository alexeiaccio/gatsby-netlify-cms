import * as React from 'react'

import { HTML } from '../html/index'
import { TextContainer } from '../main/index'

import { textStyles } from './styles'

interface BodyTextProps {
  text: string
}

export function BodyText({ text }: BodyTextProps) {
  if (!text) { return null }

  return (
    <TextContainer css={textStyles}>
      <HTML>
        {text}
      </HTML>
    </TextContainer>
  )
}