import * as React from 'react'
import * as uuid from 'uuid/v1'
import { get, filter, keyBy } from 'lodash'
import {createMemo} from 'react-use'

import { ArticleBody } from '../../typings/article'

import { BodyImage } from '../slices/image/index'
import { BodyLead } from '../slices/lead/index'
import { MediaLink } from '../slices/media-link/index'
import { BodySlider } from '../slices/slider/index'
import { BodyText } from '../slices/text/index'

export function ArticleBodyContent({ body }: ArticleBody) {
  if (!body) { return null }

  const useReferences = createMemo(() => keyBy(
    filter(body, ['__typename', 'PrismicArticlesBodyReference']),
    'primary.referenceanchor'
  ))
  const references = useReferences()

  return (
    <React.Fragment>
      {body.map(({ __typename, primary, items }) => (
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
          {__typename === 'PrismicArticlesBodyMedialink' && (
            <MediaLink primary={primary} />
          )}
          {__typename === 'PrismicArticlesBodySlider' && (
            <BodySlider items={items} />
          )}
          {__typename === 'PrismicArticlesBodyText' && (
            <BodyText
              text={get(primary, 'text.html')}
              references={references}
            />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}