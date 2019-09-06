import * as React from 'react'
import { get } from 'lodash'

import { HTML } from '../../html/index'
import { DescriptionContainer } from '../../main/index'

import { videoFrameStyles } from './styles'

export function Youtube({ primary }) {
  if (!primary) { return null; }

  const caption = get(primary, 'videoresource.html');
  return (
    <figure>
      <HTML css={videoFrameStyles}>
        {get(primary, 'youtubeid.html')}
      </HTML>
      {caption && (
        <figcaption>
          <DescriptionContainer>
            <HTML>
              {caption}
            </HTML>
          </DescriptionContainer>
        </figcaption>
      )}
    </figure>
  )
}