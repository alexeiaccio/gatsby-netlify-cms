import * as React from 'react'
import * as uuid from 'uuid/v1'
import { get } from 'lodash'
import { navigate } from '@reach/router'

import { SpanHTML } from '../../html/index'

import { rowStyles, refStyles, buttonStyles } from './styles'

interface Reference {
  primary: {
    referenceanchor: string
    referencetext: {
      html: string
    }
  }
}

interface ReferencesListProps {
  references: Reference[]
}

export function ReferencesList({ references }: ReferencesListProps) {
  if (!references.length) { return null }

  return (
    <ul css={rowStyles}>
      {references.map(({ primary }) => {
        const anchor = get(primary, 'referenceanchor')
        return (
          <li
          css={refStyles}
          key={uuid()}
          >
            <button
              css={buttonStyles}
              onClick={() => navigate(`#reference-${anchor}`, { replace: true })}
            >
              {anchor}
            </button>
            {' '}
            <SpanHTML>
              {get(primary, 'referencetext.html')}
            </SpanHTML>
          </li>
        )
      })}
    </ul >
  )
}
