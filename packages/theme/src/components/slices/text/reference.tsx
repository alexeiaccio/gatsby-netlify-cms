import * as React from 'react'
import { css } from '@emotion/core'
import { get } from 'lodash'
import { useClickAway } from 'react-use'

import { HTML } from '../../html/index'

import { refStyles, numStyles } from './styles'

interface ReferenceProps {
  data: {
    height: number
    left: number
    top: number
    width: number
    reference: {
      referenceanchor: string
      referencetext: {
        html: string
      }
    }
  } | null
  close: () => void
}

export function Reference({ data, close }: ReferenceProps) {
  if (!data) { return null; }

  const ref = React.useRef(null)
  useClickAway(ref, () => {
    close()
  })

  const number = get(data, 'reference.referenceanchor')
  const { top, left, width } = data
  let boundedLeft = React.useRef(left).current 
  if (left < 6) {
    boundedLeft = 6
  } else if (left > (width - 24)) {
    boundedLeft = width - 30
  }

  return (
    <div
      css={css`
        ${refStyles};
        top: ${top + 40}px;
        &::before {
          left: ${boundedLeft}px;
        }
      `}
      ref={ref}
    >
      {number && <div css={numStyles}>{number}</div>}
      <HTML>
        {get(data, 'reference.referencetext.html', '')}
      </HTML>
    </div>
  )
}
