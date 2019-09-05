import * as React from 'react'

import { HTML } from '../../html/index'
import { TextContainer } from '../../main/index'

import { leadStyles } from './styles'

interface BodyLeadProps {
  text: string
}

export function BodyLead({ text }: BodyLeadProps) {
  if (!text) { return null }

  return (
    <TextContainer css={leadStyles}>
      <HTML>
        {text}
      </HTML>
    </TextContainer>
  )
}