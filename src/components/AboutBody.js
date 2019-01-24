import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import { HTMLContent } from '../components/Content'
import {Img} from './Img'
import { RichText } from '../components/RichText'
import { LeadText } from '../components/Typography'
import { uuid } from '../utils'

export const AboutBody = ({ about }) => (
  <div>
    {about.body.map(({ primary, __typename }) => (
      <Fragment key={uuid()}>
        {__typename === 'PrismicAboutBodyImage' && (
          <figure key={uuid()}>
            <Img
              css={css`
                ${tw(['-mx-8'])};
              `}
              src={primary.imageimage}
              key={uuid()}
            />
            <figcaption
              css={css`
                ${tw(['italic', 'mb-q48', 'text-center', 'text-list'])};
              `}
              key={uuid()}
            >
              <HTMLContent content={primary.imagecaption.html} key={uuid()} />
            </figcaption>
          </figure>
        )}
        {__typename === 'PrismicAboutBodyLead' && (
          <HTMLContent
            css={css`
              ${LeadText};
              ${tw(['mb-q64'])};
            `}
            content={primary.text.html}
            key={uuid()}
          />
        )}
        {__typename === 'PrismicAboutBodyText' && (
          <HTMLContent
            className={RichText}
            content={primary.text.html}
            key={uuid()}
          />
        )}
      </Fragment>
    ))}
  </div>
)

export const fragmentQuery = graphql`
  fragment AboutBody on PrismicAbout {
    data {
      body {
        __typename
        ... on PrismicAboutBodyLead {
          primary {
            text {
              html
            }
          }
        }
        ... on PrismicAboutBodyText {
          primary {
            text {
              html
            }
          }
        }
        ... on PrismicAboutBodyImage {
          primary {
            imageimage {
              url
              localFile {
                childImageSharp {
                  fluid(maxWidth: 640, quality: 80) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            imagecaption {
              html
            }
          }
        }
      }
    }
  }
`
