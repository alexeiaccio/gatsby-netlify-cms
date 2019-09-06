import * as React from 'react'

import { HTML } from '../../html/index'
import { TextContainer } from '../../main/index'

import { figureStyles, quoteStyles, citeStyles } from './styles'

interface BodyLeadProps {
  quote?: string
  cite?: string
}

export function BodyQuote({ quote, cite }: BodyLeadProps) {
  if (!quote) { return null }

  return (
    <TextContainer>
      <figure css={figureStyles}>
        <blockquote>
          <HTML css={quoteStyles}>
            {quote}
          </HTML>
        </blockquote>
        {cite && (
          <footer>
            <cite>
              <HTML css={citeStyles}>
                {cite}
              </HTML>
            </cite>
          </footer>
        )}
      </figure>
    </TextContainer>
  )
}