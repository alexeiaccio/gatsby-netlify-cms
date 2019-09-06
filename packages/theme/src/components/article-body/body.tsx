import * as React from 'react'
import * as uuid from 'uuid/v1'
import { get, filter, keyBy, map } from 'lodash'
import { createMemo } from 'react-use'

import { ArticleBody } from '../../typings/article'

import { ArticlesList } from '../slices/articles-list/index'
import { BodyImage } from '../slices/image/index'
import { BodyLead } from '../slices/lead/index'
import { MediaLink } from '../slices/media-link/index'
import { BodyQuote } from '../slices/quote/index'
import { ReferencesList } from '../slices/references-list/index'
import { BodySlider } from '../slices/slider/index'
import { BodyText } from '../slices/text/index'
import { Youtube } from '../slices/youtube/index'

export function ArticleBodyContent({ body }: ArticleBody) {
  if (!body) { return null }
 
  const referencesArray = filter(body, ['__typename', 'PrismicArticlesBodyReference']);
  const useReferences = createMemo(() => keyBy(referencesArray, 'primary.referenceanchor'))
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
          {__typename === 'PrismicArticlesBodyListOfArticles' && (
            <ArticlesList articles={map(items, 'articlelink.document.0')} />
          )}
          {__typename === 'PrismicArticlesBodyMedialink' && (
            <MediaLink primary={primary} />
          )}
          {__typename === 'PrismicArticlesBodyQuote' && (
            <BodyQuote
              quote={get(primary, 'quote.html')}
              cite={get(primary, 'cite.html')}
            />
          )}
          {__typename === 'PrismicArticlesBodyReferencesList' && (
            <ReferencesList references={referencesArray} />
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
          {__typename === 'PrismicArticlesBodyYoutube' && (
            <Youtube primary={primary} />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}