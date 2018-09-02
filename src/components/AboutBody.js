/* global tw */
import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from 'react-emotion'

import { HTMLContent } from '../components/Content'
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
              className={css`
                ${tw(['-mx-8'])};
              `}
              fluid={primary.imageimage.localFile.childImageSharp.fluid}
              key={uuid()}
            />
            <figcaption
              className={css`
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
            className={LeadText}
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
