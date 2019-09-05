import * as React from 'react'
import * as uuid from 'uuid/v1'
import { get } from 'lodash'

import { AboutBody } from '../../typings/about'

import { BodyImage } from '../slices/image/index'
import { BodyLead } from '../slices/lead/index'
import { BodyText } from '../slices/text/index'

export function AboutBodyContent({ body }: AboutBody) {
  if (!body) { return null }

  return (
    <React.Fragment>
      {body.map(({__typename, primary}) => (
        <React.Fragment key={uuid()}>
          {__typename === 'PrismicAboutBodyImage' && (
            <BodyImage
              image={get(primary, 'imageimage')}
              caption={get(primary, 'imagecaption.html')}
            />
          )}
          {__typename === 'PrismicAboutBodyLead' && (
            <BodyLead text={get(primary, 'text.html')} />
          )}
          {__typename === 'PrismicAboutBodyText' && (
            <BodyText text={get(primary, 'text.html')} />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}