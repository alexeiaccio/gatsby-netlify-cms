import * as React from 'react'
import * as uuid from 'uuid/v1'
import { get } from 'lodash'

import { ArticleBody } from '../../typings/article'

import { BodyImage } from '../slices/image'
import { BodyLead } from '../slices/lead'
import { BodySlider } from '../slices/slider'
import { BodyText } from '../slices/text'

export function ArticleBodyContent({ body }: ArticleBody) {
  if (!body) { return null }

  return (
    <React.Fragment>
      {body.map(({__typename, primary, items}) => (
        <React.Fragment key={uuid()}>
          {__typename === 'PrismicArticlesBodyImage' && (
            <BodyImage
              image={get(primary, 'imageimage')}
              caption={get(primary, 'imagecaption.html')}
            />
          )}
          {__typename === 'PrismicArticlesBodyLead' && (
            <BodyLead text={get(primary, 'text.html')} />
          )}
          {__typename === 'PrismicArticlesBodySlider' && (
            <BodySlider items={items} />
          )}
          {__typename === 'PrismicArticlesBodyText' && (
            <BodyText text={get(primary, 'text.html')} />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}